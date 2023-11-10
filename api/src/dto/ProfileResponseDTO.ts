import { User } from "../entities/User";

enum UserRole {
	Member = "member",
	Admin = "admin",
}

export class ProfileResponseDTO {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	coverImageUrl: string;
	biography: string;
	role: UserRole;
	totalPhotos: number;
	photos: {
		id: string;
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
		dto.id = user.id;
		dto.username = user.username;
		dto.email = user.email;
		dto.avatarUrl = user.avatarUrl;
		dto.coverImageUrl = user.coverImageUrl;
		dto.biography = user.biography;
		dto.role = UserRole[user.role as keyof typeof UserRole];
		dto.totalPhotos = user.photos?.length || 0;
		dto.photos = user.photos
			? user.photos.map((photo) => ({
					id: photo.id,
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
