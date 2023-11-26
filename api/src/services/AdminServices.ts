import { validate } from "uuid";

import dataSource from "../database/DataSource";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { User } from "../entities/User";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "../helpers/api-errors";
import { commentRepository } from "../repositories/commentRepository";
import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";
import { PhotoServices } from "./PhotoServices";

class AdminService {
	static async getUserByUsername(username: string): Promise<UserResponseDTO> {
		const user = await userRepository.findOne({
			where: { username },
			relations: [
				"photos",
				"photos.comments",
				"photos.comments.photo",
				"photos.likes.photo",
				"comments",
				"comments.photo",
				"likes",
				"likes.photo",
			],
		});

		if (!user) throw new NotFoundError("User not found");

		return UserResponseDTO.fromEntity(user);
	}

	static async deleteCommentById(
		photoId: string,
		commentId: string
	): Promise<void> {
		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: ["author", "comments"],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		if (!validate(commentId)) throw new BadRequestError("Invalid comment ID.");

		const comment = await commentRepository.findOne({
			where: { id: commentId },
			relations: ["author", "photo"],
		});

		if (!comment) throw new NotFoundError("Comment not found.");

		photo.meta.total_comments = (photo.meta.total_comments ?? 0) - 1;
		if (photo.meta.total_comments < 0)
			throw new BadRequestError("Comments count cannot be negative.");
		photo.meta.total_comments -= 1;

		await photoRepository.save(photo);
		await commentRepository.remove(comment);
		return;
	}

	static async deletePhotoById(photoId: string): Promise<void> {
		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: ["author", "comments", "likes"],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		const parts = photo.imageUrl.split("/");
		const fileName = parts.pop();
		const folderName = parts.pop();
		const publicId =
			folderName && fileName
				? `${folderName}/${fileName.split(".")[0]}`
				: undefined;

		if (!publicId) throw new Error("Failed to extract the publicId.");
		try {
			await PhotoServices.deletePhotoForAdmin(publicId);
		} catch (error) {
			console.error("Error deleting from Cloudinary:", error);
			throw new InternalServerError(
				"Failed to delete the image from Cloudinary."
			);
		}

		await photoRepository.remove(photo);
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
}

export default AdminService;
