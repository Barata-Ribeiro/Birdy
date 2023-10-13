import { User } from "../entities/User";

export class EditProfileResponseDTO {
	id: string;
	username?: string;
	avatarUrl?: string;
	coverImageUrl?: string;
	biography?: string;
	updatedAt: Date;

	static fromEntity(user: User): EditProfileResponseDTO {
		const dto = new EditProfileResponseDTO();
		dto.id = user.id;
		dto.username = user.username;
		dto.avatarUrl = user.avatarUrl;
		dto.coverImageUrl = user.coverImageUrl;
		dto.biography = user.biography;
		dto.updatedAt = user.updatedAt;
		return dto;
	}
}
