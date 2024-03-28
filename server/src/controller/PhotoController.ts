import type { Request, Response } from "express"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { PhotoService } from "../service/PhotoService"

export class PhotoController {
    private photoService: PhotoService

    constructor() {
        this.photoService = new PhotoService()
    }

    async getFeedPhotos(req: Request, res: Response) {
        let { perPage, page } = req.query as { perPage: string; page: string }
        const { userId } = req.query as { userId: string }

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

        const response = await this.photoService.getFeedPhotos(
            perPage,
            page,
            userId
        )

        return res.status(200).json({
            status: "success",
            message: "Photos retrieved successfully.",
            data: response
        })
    }

    async getPhoto(req: Request, res: Response) {}

    async uploadNewPhoto(req: Request, res: Response) {}

    async deletePhoto(req: Request, res: Response) {}
}
