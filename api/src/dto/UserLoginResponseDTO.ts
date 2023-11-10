import { User } from "../entities/User";

enum UserRole {
	Member = "member",
	Admin = "admin",
}

export class UserLoginResponseDTO {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	coverImageUrl: string;
	biography: string;
	totalPhotos: number;
	role: UserRole;
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
		dto.coverImageUrl = user.coverImageUrl;
		dto.biography = user.biography;
		dto.totalPhotos = user.photos?.length || 0;
		dto.role = UserRole[user.role as keyof typeof UserRole];
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
		dto.coverImageUrl = user.coverImageUrl;
		dto.biography = user.biography;
		dto.totalPhotos = user.photos?.length || 0;
		dto.role = UserRole[user.role as keyof typeof UserRole];
		dto.createdAt = user.createdAt;
		dto.updatedAt = user.updatedAt;
		dto.accessToken = accessToken;
		return dto;
	}
}
