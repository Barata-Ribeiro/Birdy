import { Request, Response, NextFunction } from "express";

import { CommentService } from "../services/CommentService";
import { BadRequestError } from "../helpers/api-errors";

export class CommentController {
  async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

  async getAllCommentsForPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

  async getCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

  async deleteCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}
}
