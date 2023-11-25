import { validate } from "uuid";
import { UserWithoutPassword } from "../@types/types";
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
			where: { follower: requestUser, following: userToFollow },
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
			where: { follower: requestUser, following: userToFollow },
		});
		if (!checkIfFollowing)
			throw new NotFoundError("Following relationship not found.");

		await followsRepository.remove(checkIfFollowing);
	}

	static async getAllUsersFollowing(
		userId: string,
		limit: number,
		offset: number
	): Promise<{ users: User[]; total: number; totalPages: number }> {
		const requestUser = await this.verifyUser(userId);

		const [users, total] = await followsRepository.findAndCount({
			where: { follower: requestUser },
			relations: ["following"],
			take: limit,
			skip: offset,
		});

		return {
			users: users.map((follow) => follow.following),
			total,
			totalPages: Math.ceil(total / limit),
		};
	}
}
