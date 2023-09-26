import { validate } from "uuid";

import { userRepository } from "../repositories/userRepository";
import { photoRepository } from "../repositories/photoRepository";
import { userLikeRepository } from "../repositories/likeRepository";

import { UserLikesResponseDTO } from "../dto/UserLikesResponseDTO";

import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { UserWithoutPassword } from "../@types/types";

export class LikeServices {
  static async toggleLike(
    user: UserWithoutPassword,
    photoId: string
  ): Promise<UserLikesResponseDTO> {
    if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

    const [actualUser, actualPhoto] = await Promise.all([
      userRepository.findOne({ where: { id: user.id } }),
      photoRepository.findOne({
        where: { id: photoId },
        relations: ["author", "likes", "comments"],
      }),
    ]);

    if (!actualUser) throw new NotFoundError("User not found.");
    if (!actualPhoto) throw new NotFoundError("Photo not found.");

    let userLike = await userLikeRepository.findOne({
      where: { userId: actualUser.id, photoId: actualPhoto.id },
      relations: ["user", "photo"],
    });

    if (userLike) {
      userLike.isActive = !userLike.isActive;
      await userLikeRepository.save(userLike);

      if (userLike.isActive) actualPhoto.meta.total_likes! += 1;
      else if (actualPhoto.meta.total_likes! > 0)
        actualPhoto.meta.total_likes! -= 1;
    } else {
      const inactiveUserLike = await userLikeRepository.findOne({
        where: {
          userId: actualUser.id,
          photoId: actualPhoto.id,
          isActive: false,
        },
        relations: ["user", "photo"],
      });

      if (inactiveUserLike) {
        inactiveUserLike.isActive = true;
        userLike = await userLikeRepository.save(inactiveUserLike);
      } else {
        const newUserLike = userLikeRepository.create({
          userId: actualUser.id,
          photoId: actualPhoto.id,
          isActive: true,
        });
        userLike = await userLikeRepository.save(newUserLike);
      }
      actualPhoto.meta.total_likes! += 1;
    }

    await photoRepository.save(actualPhoto);

    return UserLikesResponseDTO.fromEntity(userLike);
  }
}
