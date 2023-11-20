import { validate } from "uuid";

import { Comment } from "../entities/Comment";
import { User } from "../entities/User";

import { UserWithoutPassword } from "../@types/types";

import { commentRepository } from "../repositories/commentRepository";
import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";

import { CommentResponseDTO } from "../dto/CommentResponseDTO";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class CommentServices {
	static async createComment(
		user: UserWithoutPassword,
		comment: string,
		photoId: string
	): Promise<CommentResponseDTO> {
		const actualUser = await this.verifyUser(user.id);

		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: ["author"],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		const userComment = new Comment();
		userComment.authorID = actualUser.id;
		userComment.authorName = actualUser.username;
		userComment.content = comment;
		userComment.photo = photo;
		photo.meta.total_comments! += 1;

		await photoRepository.save(photo);
		await commentRepository.save(userComment);

		return CommentResponseDTO.fromEntity(userComment);
	}

	private static async verifyUser(userId: string): Promise<User> {
		const actualUser = await userRepository.findOne({ where: { id: userId } });
		if (!actualUser) throw new NotFoundError("User not found.");
		return actualUser;
	}

	static async getAllCommentsForPhoto(
		photoId: string
	): Promise<CommentResponseDTO[]> {
		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: ["author", "comments", "comments.photo"],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		if (!photo.comments) return [];

		return photo.comments.map((comment) =>
			CommentResponseDTO.fromEntity(comment)
		);
	}

	static async getCommentById(
		photoId: string,
		commentId: string
	): Promise<CommentResponseDTO> {
		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: ["author", "comments"],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		if (!validate(commentId))
			throw new BadRequestError("Invalid comment ID format.");

		const comment = await commentRepository.findOne({
			where: { id: commentId },
			relations: ["author", "photo"],
		});

		if (!comment) throw new NotFoundError("Comment not found.");

		return CommentResponseDTO.fromEntity(comment);
	}

	static async deleteCommentById(
		user: UserWithoutPassword,
		photoId: string,
		commentId: string
	): Promise<void> {
		if (!validate(user.id))
			throw new BadRequestError("Invalid user ID format.");

		const actualUser = await this.verifyUser(user.id);

		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: ["author", "comments"],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		if (!validate(commentId))
			throw new BadRequestError("Invalid comment ID format.");

		const comment = await commentRepository.findOne({
			where: { id: commentId },
			relations: ["author", "photo"],
		});

		if (!comment) throw new NotFoundError("Comment not found.");

		if (comment.authorID !== actualUser.id)
			throw new BadRequestError("You are not the author of this comment.");

		photo.meta.total_comments = (photo.meta.total_comments ?? 0) - 1;
		if (photo.meta.total_comments < 0)
			throw new BadRequestError("Comments count cannot be negative.");

		photo.meta.total_comments -= 1;

		await photoRepository.save(photo);
		await commentRepository.remove(comment);
		return;
	}
}
