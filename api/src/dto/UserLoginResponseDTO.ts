import { User } from "../entities/User";

export class UserLoginResponseDTO {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	createdAt: Date;
	updatedAt: Date;
	accessToken?: string;
	refreshToken?: string;

	static fromEntity(user: User, accessToken: string): UserLoginResponseDTO {
		const dto = new UserLoginResponseDTO();
		dto.id = user.id;
		dto.username = user.username;
		dto.email = user.email;
		dto.avatarUrl = user.avatarUrl;
		dto.createdAt = user.createdAt;
		dto.updatedAt = user.updatedAt;
		dto.accessToken = accessToken;
		dto.refreshToken = user.refreshToken;

		return dto;
	}

	static fromEntityWithoutRefreshToken(
		user: User,
		accessToken: string
	): UserLoginResponseDTO {
		const dto = new UserLoginResponseDTO();
		dto.id = user.id;
		dto.username = user.username;
		dto.email = user.email;
		dto.avatarUrl = user.avatarUrl;
		dto.createdAt = user.createdAt;
		dto.updatedAt = user.updatedAt;
		dto.accessToken = accessToken;
		return dto;
	}
}
