import { Photo } from "../entities/Photo";
import { PhotoMeta } from "../entities/PhotoMeta";
import { CommentResponseDTO } from "./CommentResponseDTO";
import { UserLikesResponseDTO } from "./UserLikesResponseDTO";

export class PhotoResponseDTO {
	id: string;
	authorID: string;
	authorName: string;
	title: string;
	imageUrl: string;
	meta: PhotoMeta;
	comments: CommentResponseDTO[];
	likes: UserLikesResponseDTO[];
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(photo: Photo): PhotoResponseDTO {
		const dto = new PhotoResponseDTO();
		dto.id = photo.id;
		dto.authorID = photo.authorID;
		dto.authorName = photo.authorName;
		dto.title = photo.title;
		dto.imageUrl = photo.imageUrl;
		dto.meta = photo.meta;
		dto.comments = photo.comments
			? photo.comments.map((comment) => CommentResponseDTO.fromEntity(comment))
			: [];
		dto.likes = photo.likes
			? photo.likes.map((like) => UserLikesResponseDTO.fromEntity(like))
			: [];
		dto.createdAt = photo.createdAt;
		dto.updatedAt = photo.updatedAt;
		return dto;
	}
}
