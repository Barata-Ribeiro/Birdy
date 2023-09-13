import { Request } from "express";

import { UnauthorizedError, NotFoundError } from "../helpers/api-errors";
import { photoRepository } from "../repositories/photoRepositoty";
import { userRepository } from "../repositories/userRepository";
import { PhotoStats } from "../@types/birdy";
import { User } from "../entities/User";

export class StatsServices {
  static async getStats(req: Request): Promise<PhotoStats[]> {
    const user = req.user;

    if (!user) throw new UnauthorizedError("User not authenticated.");

    const actualUser = (await userRepository.findOne({
      where: { id: user.id as string },
    })) as User;

    if (!actualUser) throw new NotFoundError("User not found.");

    const userPhotos = await photoRepository.find({
      where: { authorID: actualUser },
    });

    const stats: PhotoStats[] = userPhotos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      hits: photo.meta.access,
    }));

    return stats;
  }
}
