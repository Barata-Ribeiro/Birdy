import { User } from "../entities/User";

export class ProfileResponseDTO {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	coverImageUrl: string;
	biography: string;
	role: string;
	totalPhotos: number;
	totalFollowers: number;
	totalFollowing: number;
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
		dto.role = user.role;
		dto.totalPhotos = user.photos?.length || 0;
		dto.totalFollowers = user.followers?.length || 0;
		dto.totalFollowing = user.followings?.length || 0;
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
