import { userRepository } from "../repositories/userRepository";
import { photoRepository } from "../repositories/photoRepository";
import { userLikeRepository } from "../repositories/likeRepository";

import { UserLikesResponseDTO } from "../dto/UserLikesResponseDTO";

import { NotFoundError } from "../helpers/api-errors";
import { UserWithoutPassword } from "../@types/types";

export class LikeServices {
  static async toggleLike(
    user: UserWithoutPassword,
    photoId: string
  ): Promise<UserLikesResponseDTO> {
    const actualUser = await userRepository.findOneBy({ id: user.id });
    if (!actualUser) throw new NotFoundError("User not found.");

    const actualPhoto = await photoRepository.findOneBy({ id: photoId });
    if (!actualPhoto) throw new NotFoundError("Photo not found.");

    let userLike = await userLikeRepository.findOneBy({
      user: actualUser,
      photo: actualPhoto,
    });

    if (userLike) {
      userLike.isActive = !userLike.isActive;
      await userLikeRepository.save(userLike);

      actualPhoto.meta.total_likes! += userLike.isActive ? 1 : -1;
    } else {
      const newUserLike = userLikeRepository.create({
        user: actualUser,
        photo: actualPhoto,
        isActive: true,
      });
      userLike = await userLikeRepository.save(newUserLike);
      actualPhoto.meta.total_likes! += 1;
    }

    return UserLikesResponseDTO.fromEntity(userLike);
  }
}
