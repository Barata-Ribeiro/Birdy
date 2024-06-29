import type { Request, Response } from "express"
import type { PhotoUploadBody } from "../interface/PhotoInterfaces"
import {
    BadRequestError,
    UnauthorizedError
} from "../middleware/helpers/ApiErrors"
import { PhotoService } from "../service/PhotoService"
import { isUUIDValid } from "../utils/validity-functions"

export class PhotoController {
    private photoService: PhotoService

    constructor() {
        this.photoService = new PhotoService()
    }

    async getFeedPhotos(req: Request, res: Response) {
        let { perPage, page } = req.query as { perPage: string; page: string }
        const { userId } = req.query as { userId: string }

        const queryWasProvided = perPage && page
        const perPageIsNumber = !isNaN(+perPage)
        const pageIsNumber = !isNaN(+page)

        if (queryWasProvided && (!perPageIsNumber || !pageIsNumber))
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
            code: res.statusCode,
            message: "Photos retrieved successfully.",
            data: response
        })
    }

    async getPhoto(req: Request, res: Response) {
        const { photoId } = req.params
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")
        if (!isUUIDValid(photoId))
            throw new BadRequestError("Invalid photo ID.")

        const response = await this.photoService.getPhoto(photoId)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Photo retrieved successfully.",
            data: response
        })
    }

    async uploadNewPhoto(req: Request, res: Response) {
        const { user } = req
        const { file } = req as { file: Express.Multer.File }
        const requestingBody = req.body as PhotoUploadBody

        if (!user.data) throw new UnauthorizedError("User not authenticated.")
        if (!file) throw new BadRequestError("No file provided.")
        if (!requestingBody)
            throw new BadRequestError("You must provide the photo details.")

        await this.photoService.uploadNewPhoto(user.data, file, requestingBody)

        return res.status(201).json({
            status: "success",
            code: res.statusCode,
            message: "Photo uploaded successfully."
        })
    }

    async deletePhoto(req: Request, res: Response) {
        const { user } = req
        const { photoId } = req.params

        if (!user.data) throw new UnauthorizedError("User not authenticated.")
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")

        await this.photoService.deletePhoto(user.data, photoId)

        return res.status(204).json({
            status: "success",
            code: res.statusCode,
            message: "Photo deleted successfully."
        })
    }

    async toggleLike(req: Request, res: Response) {
        const { user } = req
        const { photoId } = req.params

        if (!user.data) throw new UnauthorizedError("User not authenticated.")
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")

        const like = await this.photoService.toggleLike(user.data, photoId)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Like toggled successfully.",
            data: like
        })
    }
}
