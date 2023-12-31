import { Comment } from "../entities/Comment";

export class CommentResponseDTO {
	id: string;
	authorID: string;
	authorName: string;
	photoId: string;
	photoAuthorName: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(comment: Comment): CommentResponseDTO {
		const dto = new CommentResponseDTO();
		dto.id = comment.id;
		dto.authorID = comment.authorID;
		dto.authorName = comment.authorName;
		dto.photoId = comment.photo.id;
		dto.photoAuthorName = comment.photo.authorName;
		dto.content = comment.content;
		dto.createdAt = comment.createdAt;
		dto.updatedAt = comment.updatedAt;
		return dto;
	}
}
