import type { Request, Response } from "express"
import {
    BadRequestError,
    UnauthorizedError
} from "../middleware/helpers/ApiErrors"
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
            code: res.statusCode,
            message: "Comments retrieved successfully.",
            data: response
        })
    }

    async addComment(req: Request, res: Response) {
        const { user } = req
        const { photoId } = req.params
        const { content } = req.body

        if (!user.data) throw new UnauthorizedError("User not authenticated.")
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")

        const response = await this.commentService.addComment(
            user.data,
            photoId,
            content
        )

        return res.status(201).json({
            status: "success",
            code: res.statusCode,
            message: "Comment added successfully.",
            data: response
        })
    }

    async updateComment(req: Request, res: Response) {
        const { user } = req
        const { photoId } = req.params
        const { commentId } = req.params
        const { content } = req.body

        if (!user.data) throw new UnauthorizedError("User not authenticated.")
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")
        if (!commentId)
            throw new BadRequestError("The comment ID parameter is required.")

        await this.commentService.updateComment(
            user.data,
            photoId,
            commentId,
            content
        )

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Comment updated successfully."
        })
    }

    async deleteComment(req: Request, res: Response) {
        const { user } = req
        const { photoId } = req.params
        const { commentId } = req.params

        if (!user.data) throw new UnauthorizedError("User not authenticated.")
        if (!photoId)
            throw new BadRequestError("The photo ID parameter is required.")
        if (!commentId)
            throw new BadRequestError("The comment ID parameter is required.")

        await this.commentService.deleteComment(user.data, photoId, commentId)

        return res.status(204).json({
            status: "success",
            code: res.statusCode,
            message: "Comment deleted successfully."
        })
    }
}
