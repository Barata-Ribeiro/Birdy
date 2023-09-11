import { Request } from "express";

import { UnauthorizedError, NotFoundError } from "../helpers/api-errors";
import { photoRepository } from "../repositories/photoRepositoty";
import { userRepository } from "../repositories/userRepository";
import { PhotoStats } from "../@types/birdy";

export class StatsServices {
  static async getStats(req: Request): Promise<PhotoStats[]> {
    const userId = req.userId;

    if (!userId) throw new UnauthorizedError("User not authenticated.");

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundError("User not found.");

    const userPhotos = await photoRepository.find({
      where: { authorID: user },
    });

    const stats: PhotoStats[] = userPhotos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      hits: photo.meta.access,
    }));

    return stats;
  }
}
