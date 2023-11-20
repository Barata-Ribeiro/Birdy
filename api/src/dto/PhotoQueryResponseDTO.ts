import { Photo } from "../entities/Photo";
import { PhotoMeta } from "../entities/PhotoMeta";

export class PhotoQueryResponseDTO {
	id: string;
	authorID: string;
	authorName: string;
	title: string;
	imageUrl: string;
	meta: PhotoMeta;
	createdAt: Date;
	updatedAt: Date;

	static fromEntity(photo: Photo): PhotoQueryResponseDTO {
		const dto = new PhotoQueryResponseDTO();
		dto.id = photo.id;
		dto.authorID = photo.authorID;
		dto.authorName = photo.authorName;
		dto.title = photo.title;
		dto.imageUrl = photo.imageUrl;
		dto.meta = photo.meta;
		dto.createdAt = photo.createdAt;
		dto.updatedAt = photo.updatedAt;
		return dto;
	}
}
