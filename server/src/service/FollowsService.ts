import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { followsRepository } from "../repository/FollowsRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isUUIDValid } from "../utils/validity-functions"

export default class FollowsService {
    async getAllUserFollows(
        username: string,
        followType: string,
        perPage: string,
        page: string
    ) {
        let realPage: number
        let realTake: number

        if (perPage) realTake = +perPage
        else {
            perPage = "10"
            realTake = 10
        }

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
                .select([
                    "follower.id",
                    "follower.username",
                    "follower.display_name",
                    "follower.avatar_url"
                ])
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
                .select([
                    "following.id",
                    "following.username",
                    "following.display_name",
                    "following.avatar_url"
                ])
                .leftJoin("userFollow.follower", "follower")
                .where("follower.username = :username", { username })
                .orderBy("userFollow.started_following", "DESC")
                .skip(realPage)
                .take(realTake)
                .getManyAndCount()
        } else
            throw new BadRequestError(
                "Invalid follow type. Use 'followers' or 'followings'."
            )

        const result = users.map((userFollow) => {
            const user =
                followType === "followers"
                    ? userFollow.follower
                    : userFollow.following
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

    async followUser(userId: string, followId: string) {
        if (userId === followId)
            throw new BadRequestError("You cannot follow yourself.")

        if (!isUUIDValid(followId))
            throw new BadRequestError("Invalid user ID.")

        const checkIfAlreadyFollowing = await followsRepository.exists({
            where: { follower: { id: userId }, following: { id: followId } },
            relations: ["follower", "following"]
        })
        if (checkIfAlreadyFollowing)
            throw new BadRequestError("You are already following this user.")

        const newFollow = await followsRepository.create({
            follower: { id: userId },
            following: { id: followId }
        })

        await saveEntityToDatabase(followsRepository, newFollow)
    }
}
