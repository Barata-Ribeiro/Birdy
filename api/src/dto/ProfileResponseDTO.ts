import { User } from "../entities/User";

export class ProfileResponseDTO {
  username: string;
  email: string;
  photos: {
    title: string;
    imageUrl: string;
    meta: {
      total_likes: number;
      total_comments: number;
      total_hits: number;
    };
  }[];

  static fromEntity(user: User): ProfileResponseDTO {
    const dto = new ProfileResponseDTO();
    dto.username = user.username;
    dto.email = user.email;
    dto.photos = user.photos
      ? user.photos.map((photo) => ({
          title: photo.title,
          imageUrl: photo.imageUrl,
          meta: {
            total_likes: photo.meta.total_likes ?? 0,
            total_comments: photo.meta.total_comments ?? 0,
            total_hits: photo.meta.total_hits ?? 0,
          },
        }))
      : [];
    return dto;
  }
}
