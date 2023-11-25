import { UserFollow } from "../entities/UserFollow";

export class FollowQueryResponseDTO {
	id: string;
	followingID: string;
	followingName: string;
	followingAvatar: string;
	startedFollowingAt: Date;

	static fromEntity(follow: UserFollow): FollowQueryResponseDTO {
		const dto = new FollowQueryResponseDTO();
		dto.id = follow.id;
		dto.followingID = follow.following.id;
		dto.followingName = follow.following.username;
		dto.followingAvatar = follow.following.avatarUrl;
		dto.startedFollowingAt = follow.startedFollowing;
		return dto;
	}
}
