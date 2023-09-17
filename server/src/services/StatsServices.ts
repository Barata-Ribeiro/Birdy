import { NotFoundError } from "../helpers/api-errors";
import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";
import { PhotoStats, UserWithoutPassword } from "../@types/types";

export class StatsServices {
  static async getStats(
    user: UserWithoutPassword | undefined
  ): Promise<PhotoStats[]> {
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
