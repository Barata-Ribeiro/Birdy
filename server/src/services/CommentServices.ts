import { validate } from "uuid";

import { User } from "../entities/User";
import { Comment } from "../entities/Comment";

import { UserWithoutPassword } from "../@types/types";

import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";
import { commentRepository } from "../repositories/commentRepository";

import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class CommentServices {
  static async createComment(
    user: UserWithoutPassword,
    comment: string,
    photoId: string
  ): Promise<Comment> {
    const actualUser = await this.verifyUser(user.id);

    const parsedPhotoId = parseInt(photoId, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedPhotoId },
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

    return userComment;
  }

  private static async verifyUser(userId: string): Promise<User> {
    const actualUser = await userRepository.findOne({ where: { id: userId } });
    if (!actualUser) throw new NotFoundError("User not found.");
    return actualUser;
  }

  static async getAllCommentsForPhoto(photoId: string): Promise<Comment[]> {
    const parsedPhotoId = parseInt(photoId, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedPhotoId },
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    return photo.comments;
  }

  static async getCommentById(
    photoId: string,
    commentId: string
  ): Promise<Comment> {
    const parsedPhotoId = parseInt(photoId, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedPhotoId },
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

    return comment;
  }

  static async deleteCommentById(
    user: UserWithoutPassword,
    photoId: string,
    commentId: string
  ): Promise<void> {
    if (!validate(user.id))
      throw new BadRequestError("Invalid user ID format.");

    const actualUser = await this.verifyUser(user.id);

    const parsedPhotoId = parseInt(photoId, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedPhotoId },
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
