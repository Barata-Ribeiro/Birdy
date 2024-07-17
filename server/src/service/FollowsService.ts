import { AppDataSource } from "../database/data-source"
import { BadRequestError, InternalServerError } from "../middleware/helpers/ApiErrors"
import { followsRepository } from "../repository/FollowsRepository"
import { isUUIDValid } from "../utils/validity-functions"
import { UserFollow } from "../entity/UserFollow"

export default class FollowsService {
    async getAllUserFollows(username: string, followType: string, perPage: string, page: string) {
        let realPage: number
        let realTake: number

        if (perPage) realTake = +perPage
        else realTake = 10

        if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake
        else {
            realPage = 0
            page = "1"
        }

        let users
        let total

        if (followType === "followers") {
            ;[users, total] = await followsRepository
                .createQueryBuilder("userFollow")
                .leftJoinAndSelect("userFollow.follower", "follower")
                .select(["follower.id", "follower.username", "follower.display_name", "follower.avatar_url"])
                .leftJoin("userFollow.following", "following")
                .where("following.username = :username", { username })
                .orderBy("userFollow.started_following", "DESC")
                .skip(realPage)
                .take(realTake)
                .getManyAndCount()
        } else if (followType === "followings") {
            ;[users, total] = await followsRepository
                .createQueryBuilder("userFollow")
                .leftJoinAndSelect("userFollow.following", "following")
                .select(["following.id", "following.username", "following.display_name", "following.avatar_url"])
                .leftJoin("userFollow.follower", "follower")
                .where("follower.username = :username", { username })
                .orderBy("userFollow.started_following", "DESC")
                .skip(realPage)
                .take(realTake)
                .getManyAndCount()
        } else throw new BadRequestError("Invalid follow type. Use 'followers' or 'followings'.")

        const result = users.map((userFollow) => {
            const user = followType === "followers" ? userFollow.follower : userFollow.following
            return {
                id: user.id,
                username: user.username,
                display_name: user.display_name,
                avatar_url: user.avatar_url
            }
        })

        const hasNextPage = realPage + realTake < total

        return {
            data: result,
            total,
            perPage: realTake,
            currentPage: +page,
            hasNextPage
        }
    }

    async checkIfUserIsFollowed(username: string, loggedUserId: string) {
        return await followsRepository.exists({
            where: {
                follower: { id: loggedUserId },
                following: { username }
            }
        })
    }

    async followUser(userId: string, followId: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            if (userId === followId) throw new BadRequestError("You cannot follow yourself.")

            if (!isUUIDValid(followId)) throw new BadRequestError("Invalid user ID.")

            const checkIfAlreadyFollowing = await followsRepository.exists({
                where: { follower: { id: userId }, following: { id: followId } },
                relations: ["follower", "following"]
            })
            if (checkIfAlreadyFollowing) throw new BadRequestError("You are already following this user.")

            try {
                const newFollow = transactionalEntityManager.create(UserFollow, {
                    follower: { id: userId },
                    following: { id: followId }
                })

                await transactionalEntityManager.save(newFollow)
            } catch (error) {
                console.error("Transaction failed: ", error)
                throw new InternalServerError("Failed to follow user.")
            }
        })
    }

    async unfollowUser(userId: string, followId: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            if (userId === followId) throw new BadRequestError("You cannot unfollow yourself.")
            if (!isUUIDValid(followId)) throw new BadRequestError("Invalid user ID.")
            const followToDelete = await followsRepository.findOne({
                where: {
                    follower: { id: userId },
                    following: { id: followId }
                },
                relations: ["follower", "following"]
            })
            if (!followToDelete) throw new BadRequestError("You are not following this user.")

            try {
                await transactionalEntityManager.remove(followToDelete)
            } catch (error) {
                console.error("Transaction failed: ", error)
                throw new InternalServerError("Failed to unfollow user.")
            }
        })
    }
}
