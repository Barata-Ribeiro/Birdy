import { User } from "../entities/User";
import { CommentResponseDTO } from "./CommentResponseDTO";
import { PhotoResponseDTO } from "./PhotoResponseDTO";
import { UserLikesResponseDTO } from "./UserLikesResponseDTO";

export class UserResponseDTO {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	coverImageUrl: string;
	biography: string;
	photos: PhotoResponseDTO[];
	comments: CommentResponseDTO[];
	likes: UserLikesResponseDTO[];
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(user: User): UserResponseDTO {
		const dto = new UserResponseDTO();
		dto.id = user.id;
		dto.username = user.username;
		dto.email = user.email;
		dto.avatarUrl = user.avatarUrl;
		dto.coverImageUrl = user.coverImageUrl;
		dto.biography = user.biography;
		dto.photos = user.photos
			? user.photos.map((photo) => PhotoResponseDTO.fromEntity(photo))
			: [];
		dto.comments = user.comments
			? user.comments.map((comment) => CommentResponseDTO.fromEntity(comment))
			: [];
		dto.likes = user.likes
			? user.likes.map((like) => UserLikesResponseDTO.fromEntity(like))
			: [];
		dto.createdAt = user.createdAt;
		dto.updatedAt = user.updatedAt;
		return dto;
	}
}
