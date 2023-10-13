import { Request, Response } from "express";

import { User } from "../entities/User";
import { CreateUserRequestBody, EditProfileRequest } from "../@types/types";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import UserService from "../services/UserServices";

export class UserController {
	async createUser(req: Request, res: Response): Promise<Response> {
		const userData = req.body as CreateUserRequestBody;
		const newUser = await UserService.createUser(userData);
		return res.status(201).json(newUser);
	}

	async getUserById(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params as { userId: string };
		const user = await UserService.getUserById(userId);
		return res.status(200).json(user);
	}

	async getAllUsers(_req: Request, res: Response): Promise<Response> {
		const users = await UserService.getAllUsers();
		return res.status(200).json(users);
	}

	async editUserProfile(
		req: EditProfileRequest,
		res: Response
	): Promise<Response> {
		const userData = req.body;
		const completeUser = req.user as User;

		const { id } = completeUser;

		const user = await UserService.editUserProfile(id, userData);
		return res.status(200).json(user);
	}

	async deleteUserById(req: Request, res: Response): Promise<Response | void> {
		const { userId } = req.params as { userId: string };

		if (typeof req.params.id !== "string")
			throw new BadRequestError("No user ID provided.");

		await UserService.deleteUserById(userId);
		return res.status(200).send({ message: "User deleted successfully." });
	}

	async deleteOwnAccount(
		req: Request,
		res: Response
	): Promise<Response | void> {
		const user = req.user;
		if (!user) throw new UnauthorizedError("User not authenticated.");

		const { id } = user;

		await UserService.deleteOwnAccount(id);
		return res.status(200).send({ message: "Account deleted successfully." });
	}
}
