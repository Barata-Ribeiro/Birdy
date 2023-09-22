import { validate } from "uuid";

import { User } from "../entities/User";
import { Comment } from "../entities/Comment";

import {
  Comment as InterfaceComment,
  CommentResponse,
  UserWithoutPassword,
} from "../@types/types";

import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";
import { commentRepository } from "../repositories/commentRepository";

import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class CommentServices {
  static async createComment(
    user: UserWithoutPassword,
    comment: string,
    photoId: string
  ): Promise<CommentResponse> {
    const actualUser = await this.verifyUser(user.id);

    if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

    const photo = await photoRepository.findOne({
      where: { id: photoId },
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    const userComment = new Comment();
    userComment.authorID = actualUser;
    userComment.content = comment;
    userComment.photo = photo;
    photo.total_comments += 1;

    await photoRepository.save(photo);
    await commentRepository.save(userComment);

    return {
      id: userComment.id,
      authorID: userComment.authorID.id,
      content: userComment.content,
      date: userComment.date,
      photo: {
        id: photo.id,
        authorID: photo.authorID.id,
        url: photo.imageUrl,
        title: photo.title,
        size: photo.meta.size,
        habitat: photo.meta.habitat,
      },
    };
  }

  private static async verifyUser(userId: string): Promise<User> {
    const actualUser = await userRepository.findOne({ where: { id: userId } });
    if (!actualUser) throw new NotFoundError("User not found.");
    return actualUser;
  }

  static async getAllCommentsForPhoto(
    photoId: string
  ): Promise<InterfaceComment[]> {
    if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

    const photo = await photoRepository.findOne({
      where: { id: photoId },
      relations: ["authorID", "comments", "comments.authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    return photo.comments.map((comment) => ({
      id: comment.id,
      authorID: comment.authorID.id,
      authorName: comment.authorID.username,
      content: comment.content,
      date: comment.date,
    }));
  }

  static async getCommentById(
    photoId: string,
    commentId: string
  ): Promise<InterfaceComment> {
    if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

    const photo = await photoRepository.findOne({
      where: { id: photoId },
      relations: ["authorID", "comments", "comments.authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    if (!validate(commentId))
      throw new BadRequestError("Invalid comment ID format.");

    const comment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ["authorID", "photo", "photo.authorID"],
    });

    if (!comment) throw new NotFoundError("Comment not found.");

    return {
      id: comment.id,
      authorID: comment.authorID.id,
      authorName: comment.authorID.username,
      content: comment.content,
      date: comment.date,
    };
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
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    if (!validate(commentId))
      throw new BadRequestError("Invalid comment ID format.");

    const comment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ["authorID"],
    });

    if (!comment) throw new NotFoundError("Comment not found.");

    if (comment.authorID.id !== actualUser.id)
      throw new BadRequestError("You are not the author of this comment.");

    if (photo.total_comments > 0) photo.total_comments -= 1;
    else throw new BadRequestError("Comments count is already zero.");

    await photoRepository.save(photo);
    await commentRepository.remove(comment);
    return;
  }
}
