import { validate } from "uuid";
import { UserWithoutPassword } from "../@types/types";
import { ALL_FOLLOWINS_CACHE_KEY, userFollowingCacheKey } from "../constants";
import { FollowQueryResponseDTO } from "../dto/FollowQueryResponseDTO";
import { User } from "../entities/User";
import { UserFollow } from "../entities/UserFollow";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { followsRepository } from "../repositories/followsRepositoy";
import { userRepository } from "../repositories/userRepository";

export class FollowingServices {
	private static async verifyUser(userId: string): Promise<User> {
		if (!validate(userId)) throw new BadRequestError("Invalid User ID.");

		const actualUser = await userRepository.findOne({ where: { id: userId } });

		if (!actualUser) throw new NotFoundError("User not found.");

		return actualUser;
	}
	static async followUser(
		user: UserWithoutPassword,
		userIdToFollow: string
	): Promise<void> {
		if (user.id === userIdToFollow)
			throw new BadRequestError("Cannot follow yourself.");

		const requestUser = await this.verifyUser(user.id);
		const userToFollow = await this.verifyUser(userIdToFollow);

		const checkIfAlreadyFollowing = await followsRepository.findOne({
			where: {
				follower: { id: requestUser.id },
				following: { id: userToFollow.id },
			},
			relations: ["follower", "following"],
		});
		if (checkIfAlreadyFollowing)
			throw new BadRequestError("Already following this user.");

		const userFollow = new UserFollow();
		userFollow.follower = requestUser;
		userFollow.following = userToFollow;

		await followsRepository.save(userFollow);
	}

	static async unfollowUser(
		user: UserWithoutPassword,
		userIdToFollow: string
	): Promise<void> {
		const requestUser = await this.verifyUser(user.id);
		const userToFollow = await this.verifyUser(userIdToFollow);

		const checkIfFollowing = await followsRepository.findOne({
			where: {
				follower: { id: requestUser.id },
				following: { id: userToFollow.id },
			},
			relations: ["follower", "following"],
		});
		if (!checkIfFollowing)
			throw new NotFoundError("Following relationship not found.");

		await followsRepository.remove(checkIfFollowing);
	}

	static async getAllUserFollowings(
		userId: string,
		limit: number,
		page: number
	): Promise<FollowQueryResponseDTO[]> {
		if (page < 1 || limit < 1)
			throw new BadRequestError("Page and limit must be positive integers.");

		const cacheKey = userId
			? userFollowingCacheKey(userId)
			: ALL_FOLLOWINS_CACHE_KEY;
		const [followings, total] = await followsRepository
			.createQueryBuilder("userFollow")
			.leftJoinAndSelect("userFollow.following", "following")
			.leftJoin("userFollow.follower", "follower")
			.where(userId ? "follower.id = :userId" : "1=1", { userId })
			.take(limit)
			.skip((page - 1) * limit)
			.cache(cacheKey, 60000)
			.getManyAndCount();

		if ((page - 1) * limit >= total && page !== 1) return [];

		return followings.map((follow) =>
			FollowQueryResponseDTO.fromEntity(follow)
		);
	}
}
