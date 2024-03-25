import type { Request, Response } from "express"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import FollowsService from "../service/FollowsService"

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
            message: "Follows retrieved successfully.",
            data,
            total,
            perPage: realTake,
            page: currentPage,
            next: nextPage,
            prev: prevPage
        })
    }
}
