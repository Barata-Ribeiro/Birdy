import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";
import { NotFoundError } from "../helpers/api-errors";
import { PhotoStats, UserWithoutPassword } from "../@types/types";

export class StatsServices {
  static async getStats(user: UserWithoutPassword): Promise<PhotoStats[]> {
    const actualUser = await userRepository.findOneBy({ id: user.id });
    if (!actualUser) throw new NotFoundError("User not found.");

    const userPhotos = await photoRepository.find({
      where: { authorID: actualUser.id },
      select: ["id", "title", "meta"],
    });

    const stats: PhotoStats[] = userPhotos.map((photo) => ({
      id: photo.id,
      title: photo.title,
      comments: photo.meta.total_comments,
      hits: photo.meta.total_hits,
      likes: photo.meta.total_likes,
    }));

    return stats;
  }
}
