/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from "express";

import { LikeServices } from "../services/LikeServices";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";

export class LikesController {
  async toggleLike(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const user = req.user;
    if (!user) throw new UnauthorizedError("User not authenticated.");

    const { photoId } = req.params as { photoId: string };
    if (!photoId) throw new BadRequestError("No photo ID provided.");

    const result = await LikeServices.toggleLike(user, photoId);

    return res.status(200).json(result);
  }
}
