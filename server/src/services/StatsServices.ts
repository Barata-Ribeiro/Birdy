import { Request } from "express";

import { NotFoundError } from "../helpers/api-errors";
import { photoRepository } from "../repositories/photoRepositoty";
import { userRepository } from "../repositories/userRepository";
import { PhotoStats } from "../@types/types";

export class StatsServices {
  static async getStats(req: Request): Promise<PhotoStats[]> {
    const user = req.user;

    const actualUser = await userRepository.findOne({
      where: { id: user?.id },
    });

    if (!actualUser) throw new NotFoundError("User not found.");

    const userPhotos = await photoRepository.find({
      where: { authorID: { id: actualUser.id } },
    });

    const stats: PhotoStats[] = userPhotos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      hits: photo.meta.access,
    }));

    return stats;
  }
}
