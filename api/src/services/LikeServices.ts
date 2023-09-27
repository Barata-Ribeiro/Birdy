import { validate } from "uuid";

import { userRepository } from "../repositories/userRepository";
import { photoRepository } from "../repositories/photoRepository";
import { userLikeRepository } from "../repositories/likeRepository";

import { User } from "../entities/User";
import { Photo } from "../entities/Photo";
import { UserLikes } from "../entities/UserLikes";

import { UserLikesResponseDTO } from "../dto/UserLikesResponseDTO";

import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { UserWithoutPassword } from "../@types/types";

export class LikeServices {
  static async toggleLike(
    user: UserWithoutPassword,
    photoId: string
  ): Promise<UserLikesResponseDTO> {
    const actualUser = await this.verifyUser(user.id);

    const actualPhoto = await this.verifyPhoto(photoId);
    if (actualUser.id === actualPhoto.authorID)
      throw new BadRequestError("You cannot like your own photo.");

    const userLike = await userLikeRepository.findOne({
      where: { userId: actualUser.id, photoId: actualPhoto.id },
    });

    if (userLike) {
      await userLikeRepository.remove(userLike);
      actualPhoto.meta.total_likes! -= 1;
      await photoRepository.save(actualPhoto);
      return UserLikesResponseDTO.fromEntity(
        userLike,
        false,
        actualPhoto.meta.total_likes
      );
    } else {
      const newUserLike = new UserLikes();
      newUserLike.userId = actualUser.id;
      newUserLike.user = actualUser;
      newUserLike.photoId = actualPhoto.id;
      newUserLike.photo = actualPhoto;
      actualPhoto.meta.total_likes! += 1;
      await photoRepository.save(actualPhoto);
      await userLikeRepository.save(newUserLike);
      return UserLikesResponseDTO.fromEntity(
        newUserLike,
        true,
        actualPhoto.meta.total_likes
      );
    }
  }

  private static async verifyUser(userId: string): Promise<User> {
    if (!validate(userId)) throw new BadRequestError("Invalid User ID.");

    const actualUser = await userRepository.findOne({ where: { id: userId } });

    if (!actualUser) throw new NotFoundError("User not found.");

    return actualUser;
  }

  private static async verifyPhoto(photoId: string): Promise<Photo> {
    if (!validate(photoId)) throw new BadRequestError("Invalid Photo ID.");

    const actualPhoto = await photoRepository.findOne({
      where: { id: photoId },
    });

    if (!actualPhoto) throw new NotFoundError("Photo not found.");

    return actualPhoto;
  }
}
