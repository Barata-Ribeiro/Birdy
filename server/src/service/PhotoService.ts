import { FeedResponseDTO } from "../dto/FeedResponseDTO"
import { PhotoResponseDTO } from "../dto/PhotoResponseDTO"
import { NotFoundError } from "../middleware/helpers/ApiErrors"
import { photoRepository } from "../repository/PhotoRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"

export class PhotoService {
    async getFeedPhotos(
        perPage: string,
        page: string,
        userId: string
    ): Promise<FeedResponseDTO[]> {
        let realPage: number
        let realTake: number

        if (perPage) realTake = +perPage
        else {
            perPage = "10"
            realTake = 10
        }

        if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake
        else {
            realPage = 0
            page = "1"
        }

        const [photos, total] = await photoRepository
            .createQueryBuilder("photo")
            .innerJoinAndSelect("photo.author", "author")
            .select([
                "photo.id",
                "photo.title",
                "photo.description",
                "photo.image_url",
                "photo.slug",
                "photo.meta",
                "photo.createdAt",
                "photo.updatedAt",
                "author.id",
                "author.username",
                "author.display_name",
                "author.avatar_url"
            ])
            .where(userId ? "author.id = :userId" : "1=1", { userId })
            .orderBy("photo.createdAt", "DESC")
            .skip(realPage)
            .take(realTake)
            .getManyAndCount()

        if (total === 0) return []

        return photos.map((photo) => FeedResponseDTO.fromEntity(photo))
    }

    async getPhoto(photoId: string): Promise<PhotoResponseDTO> {
        const photo = await photoRepository.findOne({
            where: { id: photoId },
            relations: [
                "author",
                "comments",
                "comments.photo",
                "likes",
                "likes.photo"
            ]
        })
        if (!photo) throw new NotFoundError("Photo not found.")

        photo.meta.total_likes = (photo.meta.total_likes || 0) + 1
        await saveEntityToDatabase(photoRepository, photo)

        return PhotoResponseDTO.fromEntity(photo)
    }
}
