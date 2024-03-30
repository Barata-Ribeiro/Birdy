import type { Request, Response } from "express"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { CommentService } from "../service/CommentService"

export class CommentController {
    private commentService: CommentService

    constructor() {
        this.commentService = new CommentService()
    }

    async getComments(req: Request, res: Response) {
        const { photoId } = req.params
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")

        const response = await this.commentService.getComments(photoId)

        return res.status(200).json({
            status: "success",
            message: "Comments retrieved successfully.",
            data: response
        })
    }

    async addComment(req: Request, res: Response) {
        const { photoId } = req.params
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")
    }

    async updateComment(req: Request, res: Response) {
        const { photoId } = req.params
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")
    }

    async deleteComment(req: Request, res: Response) {
        const { photoId } = req.params
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")
    }
}
