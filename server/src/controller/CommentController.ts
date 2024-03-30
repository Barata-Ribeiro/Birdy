import type { Request, Response } from "express"
import { CommentService } from "../service/CommentService"

export class CommentController {
    private commentService: CommentService

    constructor() {
        this.commentService = new CommentService()
    }

    async getComments(req: Request, res: Response) {
        // implementation
    }

    async addComment(req: Request, res: Response) {
        // implementation
    }

    async updateComment(req: Request, res: Response) {
        // implementation
    }

    async deleteComment(req: Request, res: Response) {
        // implementation
    }
}
