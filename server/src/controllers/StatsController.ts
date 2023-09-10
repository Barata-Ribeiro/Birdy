import { Request, Response } from "express";
import { photoRepository } from "../repositories/photoRepositoty";
import { NotFoundError, UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";

export class StatsController {
  async getStats(req: Request, res: Response): Promise<Response> {
    const userId = req.userId;

    if (!userId) throw new UnauthorizedError("User not authenticated.");

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundError("User not found.");

    const userPhotos = await photoRepository.find({
      where: { authorID: user },
    });

    const stats = userPhotos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      hits: photo.meta.access,
    }));

    return res.json(stats);
  }
}
