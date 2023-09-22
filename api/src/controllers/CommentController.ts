/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";

import { CommentServices } from "../services/CommentServices";

import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";

export class CommentController {
  async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = req.user;
      if (!user) throw new UnauthorizedError("User not authenticated.");

      const { photoId } = req.params as { photoId: string };
      if (!photoId) throw new BadRequestError("No photo ID provided.");

      const { comment } = req.body as { comment: string };
      if (!comment) throw new BadRequestError("No comment provided.");

      const result = await CommentServices.createComment(
        user,
        comment,
        photoId
      );

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllCommentsForPhoto(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { photoId } = req.params as { photoId: string };
    if (!photoId) throw new BadRequestError("No photo ID provided.");

    const comments = await CommentServices.getAllCommentsForPhoto(photoId);
    return res.status(200).json(comments);
  }

  async getCommentById(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    if (typeof req.params.photoId !== "string")
      throw new BadRequestError("No photo ID provided.");

    const photoId = req.params.photoId;

    if (typeof req.params.commentId !== "string")
      throw new BadRequestError("No comment ID provided.");

    const commentId = req.params.commentId;

    const comment = await CommentServices.getCommentById(photoId, commentId);
    return res.status(200).json(comment);
  }

  async deleteCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = req.user;
      if (!user) throw new UnauthorizedError("User not authenticated.");

      if (typeof req.params.photoId !== "string")
        throw new BadRequestError("No photo ID provided.");

      const photoId = req.params.photoId;

      if (typeof req.params.commentId !== "string")
        throw new BadRequestError("No comment ID provided.");

      const commentId = req.params.commentId;

      await CommentServices.deleteCommentById(user, photoId, commentId);
      return res.status(200).send({ message: "Comment deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}
