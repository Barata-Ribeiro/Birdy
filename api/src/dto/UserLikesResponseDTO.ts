import { UserLikes } from "../entities/UserLikes";

export class UserLikesResponseDTO {
  id: string;
  userId: string;
  photoId: string;
  likedAt: Date;
  isLiked?: boolean;
  totalLikes?: number;

  static fromEntity(
    like: UserLikes,
    isLiked?: boolean,
    totalLikes?: number
  ): UserLikesResponseDTO {
    const dto = new UserLikesResponseDTO();
    dto.id = like.id;
    dto.userId = like.userId;
    dto.photoId = like.photoId;
    dto.likedAt = like.likedAt;
    dto.isLiked = isLiked;
    dto.totalLikes = totalLikes;
    return dto;
  }
}
