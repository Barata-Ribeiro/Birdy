import type { Request, Response } from "express"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import FollowsService from "../service/FollowsService"
import { isUUIDValid } from "../utils/validity-functions"

export default class FollowsController {
    private followService: FollowsService

    constructor() {
        this.followService = new FollowsService()
    }

    async getAllUserFollows(req: Request, res: Response) {
        const { username } = req.params
        if (!username) throw new BadRequestError("Username is required.")
        const followType = req.query.type as string
        let { perPage, page } = req.query as { perPage: string; page: string }

        const queryWasProvided = perPage && page
        const queryIsString =
            typeof perPage === "string" && typeof page === "string"
        const perPageIsNumber = !isNaN(+perPage)
        const pageIsNumber = !isNaN(+page)

        if (
            queryWasProvided &&
            queryIsString &&
            (!perPageIsNumber || !pageIsNumber)
        )
            throw new BadRequestError(
                "The query parameters 'perPage' and 'page' must be numbers."
            )

        const {
            data,
            total,
            perPage: realTake,
            currentPage,
            hasNextPage
        } = await this.followService.getAllUserFollows(
            username,
            followType,
            perPage,
            page
        )

        const backendOrigin =
            process.env.BACKEND_ORIGIN || "http://localhost:3000"

        const nextPage = hasNextPage
            ? `${backendOrigin}/api/v1/users/profile/${username}/follows?type=${followType}&perPage=${realTake}&page=${currentPage + 1}`
            : null

        const prevPage =
            currentPage > 1
                ? `${backendOrigin}/api/v1/users/profile/${username}/follows?type=${followType}&perPage=${realTake}&page=${currentPage - 1}`
                : null

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Follows retrieved successfully.",
            data,
            total,
            perPage: realTake,
            page: currentPage,
            next: nextPage,
            prev: prevPage
        })
    }

    async checkIfUserIsFollowed(req: Request, res: Response) {
        const { username } = req.params
        if (!username) throw new BadRequestError("Username is required.")

        const { logged_user_id } = req.query as { logged_user_id: string }
        if (!logged_user_id)
            throw new BadRequestError("Logged user ID is required.")

        const isFollowed = await this.followService.checkIfUserIsFollowed(
            username,
            logged_user_id
        )

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "User follow status retrieved successfully.",
            data: { followed_by_loggedIn_user: isFollowed }
        })
    }

    async followUser(req: Request, res: Response) {
        const userId = this.validateUserIdAndOwnership(req)
        const { followId } = req.body as { followId: string }
        if (!followId)
            throw new BadRequestError("You must provide a user ID to follow.")

        await this.followService.followUser(userId, followId)

        return res.status(201).json({
            status: "success",
            code: res.statusCode,
            message: "You are now following this user."
        })
    }

    async unfollowUser(req: Request, res: Response) {
        const userId = this.validateUserIdAndOwnership(req)
        const { followId } = req.body as { followId: string }
        if (!followId)
            throw new BadRequestError("You must provide a user ID to unfollow.")

        await this.followService.unfollowUser(userId, followId)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "You have unfollowed this user."
        })
    }

    private validateUserIdAndOwnership(req: Request) {
        const { userId } = req.params
        if (!userId) throw new BadRequestError("User ID is required.")

        if (!isUUIDValid(userId)) throw new BadRequestError("Invalid user ID.")

        if (req.user.data?.id !== userId)
            throw new BadRequestError(
                "You are not authorized to delete this profile."
            )

        return userId
    }
}
