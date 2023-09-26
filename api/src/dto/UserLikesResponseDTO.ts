import { UserLikes } from "../entities/UserLikes";

export class UserLikesResponseDTO {
  id: string;
  userId: string;
  photoId: string;
  likedAt: Date;

  static fromEntity(like: UserLikes): UserLikesResponseDTO {
    const dto = new UserLikesResponseDTO();
    dto.id = like.id;
    dto.userId = like.userId;
    dto.photoId = like.photoId;
    dto.likedAt = like.likedAt;
    return dto;
  }
}
