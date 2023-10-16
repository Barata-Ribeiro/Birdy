import * as bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
import { validate } from "uuid";

import dataSource from "../database/ormconfig";
import { User } from "../entities/User";
import { CreateUserRequestBody, EditUserRequestBody } from "../@types/types";

import { userRepository } from "../repositories/userRepository";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { EditProfileResponseDTO } from "../dto/EditProfileResponseDTO";
import { PhotoServices } from "./PhotoServices";
import {
	BadRequestError,
	ConflictError,
	InternalServerError,
	NotFoundError,
} from "../helpers/api-errors";

class UserService {
	static async createUser(
		data: CreateUserRequestBody
	): Promise<UserResponseDTO> {
		const { username, password, email } = data;

		if (!username || !password || !email)
			throw new BadRequestError("All fields are required.");

		const existingUserByEmail = await userRepository.findOneBy({ email });
		const existingUserByUsername = await userRepository.findOneBy({ username });

		if (existingUserByEmail || existingUserByUsername)
			throw new ConflictError("User already exists.");

		const isEmailValid = (email: string): boolean => {
			const regex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
			return regex.test(email);
		};

		if (!isEmailValid(email))
			throw new BadRequestError("Invalid email format.");

		const isPasswordStrong = (password: string): boolean => {
			const regex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			return regex.test(password);
		};

		if (!isPasswordStrong(password))
			throw new BadRequestError("Password is too weak.");

		const hashedPassword = await bcrypt.hash(password, 10);

		const defaultAvatarUrl =
			"https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg";
		const defaultCoverImageUrl = "https://source.unsplash.com/random/?birds";

		const newUser = userRepository.create({
			username,
			email,
			avatarUrl: defaultAvatarUrl,
			coverImageUrl: defaultCoverImageUrl,
			biography: "",
			password: hashedPassword,
		});

		try {
			await userRepository.save(newUser);
		} catch (error) {
			console.error(error);

			if (error instanceof QueryFailedError)
				throw new ConflictError("Duplicate field value entered.");

			throw new InternalServerError("Internal server error");
		}

		return UserResponseDTO.fromEntity(newUser);
	}

	static async getUserById(id: string): Promise<UserResponseDTO> {
		if (!validate(id)) throw new BadRequestError("Invalid user ID format.");

		const user = await userRepository.findOne({
			where: { id },
			relations: [
				"photos",
				"photos.comments",
				"comments",
				"likes",
				"likes.photo",
				"likes.user",
			],
		});

		if (!user) throw new NotFoundError("User not found");

		return UserResponseDTO.fromEntity(user);
	}

	static async getAllUsers(): Promise<UserResponseDTO[]> {
		const users = await userRepository.find({
			relations: [
				"photos",
				"photos.comments",
				"comments",
				"likes",
				"likes.photo",
				"likes.user",
			],
		});

		return users.map((user) => UserResponseDTO.fromEntity(user));
	}

	static async editUserProfile(
		id: string,
		userData: EditUserRequestBody
	): Promise<EditProfileResponseDTO> {
		if (!validate(id)) throw new BadRequestError("Invalid user ID.");

		const actualUser = await userRepository.findOneBy({ id });
		if (!actualUser) throw new NotFoundError("User not found.");

		const {
			username,
			password,
			newPassword,
			avatarUrl,
			coverImageUrl,
			biography,
		} = userData;

		if (username) {
			const existingUserByUsername = await userRepository.findOneBy({
				username,
			});

			if (existingUserByUsername && existingUserByUsername.id !== id)
				throw new ConflictError("Username already taken.");

			actualUser.username = username;
		}

		if (password && newPassword) {
			const isPasswordMatching = await bcrypt.compare(
				password,
				actualUser.password
			);

			if (!isPasswordMatching)
				throw new BadRequestError("Current password is incorrect.");

			const isPasswordStrong = (newPassword: string): boolean => {
				const regex =
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
				return regex.test(newPassword);
			};

			if (!isPasswordStrong(newPassword))
				throw new BadRequestError("Password is too weak.");

			const hashedNewPassword = await bcrypt.hash(newPassword, 10);
			actualUser.password = hashedNewPassword;
		}

		if (avatarUrl) actualUser.avatarUrl = avatarUrl;
		if (coverImageUrl) actualUser.coverImageUrl = coverImageUrl;
		if (biography) actualUser.biography = biography;

		await userRepository.save(actualUser);

		return EditProfileResponseDTO.fromEntity(actualUser);
	}

	static async deleteUserById(userId: string): Promise<void> {
		if (!validate(userId)) throw new BadRequestError("Invalid user ID.");

		await dataSource.manager.transaction(async (transactionalEntityManager) => {
			try {
				const actualUser = await transactionalEntityManager.findOne(User, {
					where: { id: userId },
				});
				if (!actualUser) throw new NotFoundError("User not found.");

				await PhotoServices.deleteAllPhotos(
					transactionalEntityManager,
					actualUser.id
				);

				await transactionalEntityManager.remove(actualUser);
			} catch (error) {
				console.error("Transaction failed:", error);
				throw new InternalServerError(
					"An error occurred during the deletion process."
				);
			}
		});
	}

	static async deleteOwnAccount(userId: string): Promise<void> {
		if (!validate(userId)) throw new BadRequestError("Invalid user ID.");

		await dataSource.manager.transaction(async (transactionalEntityManager) => {
			try {
				const actualUser = await transactionalEntityManager.findOne(User, {
					where: { id: userId },
				});
				if (!actualUser) throw new NotFoundError("User not found.");

				await PhotoServices.deleteAllPhotos(
					transactionalEntityManager,
					actualUser.id
				);

				await transactionalEntityManager.remove(actualUser);
			} catch (error) {
				console.error("Transaction failed:", error);
				throw new InternalServerError(
					"An error occurred during the deletion process."
				);
			}
		});
	}
}

export default UserService;
