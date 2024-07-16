import { v2 as cloudinary } from "cloudinary"
import streamifier from "streamifier"
import { AppDataSource } from "../database/data-source"
import { FeedResponseDTO } from "../dto/FeedResponseDTO"
import { PhotoResponseDTO } from "../dto/PhotoResponseDTO"
import { User } from "../entity/User"
import { PhotoUploadBody } from "../interface/PhotoInterfaces"
import { BadRequestError, InternalServerError, NotFoundError } from "../middleware/helpers/ApiErrors"
import { photoRepository } from "../repository/PhotoRepository"
import { userRepository } from "../repository/UserRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isUUIDValid } from "../utils/validity-functions"
import { UserLike } from "../entity/UserLike"
import { LikeResponseDTO } from "../dto/LikeResponseDTO"
import { likeRepository } from "../repository/LikeRepository"
import { Photo } from "../entity/Photo"

export class PhotoService {
    async getFeedPhotos(perPage: string, page: string, userId: string): Promise<FeedResponseDTO[]> {
        let realPage: number
        let realTake: number

        if (perPage) realTake = +perPage
        else realTake = 10

        if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake
        else realPage = 0

        const [photos, total] = await photoRepository
            .createQueryBuilder("photo")
            .innerJoinAndSelect("photo.author", "author")
            .select([
                "photo.id",
                "photo.title",
                "photo.description",
                "photo.image_url",
                "photo.slug",
                "photo.createdAt",
                "photo.updatedAt",
                "author.id",
                "author.username",
                "author.display_name",
                "author.avatar_url",
                "photo.meta.bird_name",
                "photo.meta.bird_size",
                "photo.meta.bird_habitat",
                "photo.meta.total_comments",
                "photo.meta.total_views",
                "photo.meta.total_likes"
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
            relations: ["author", "comments", "comments.author", "comments.photo", "likes", "likes.user", "likes.photo"]
        })
        if (!photo) throw new NotFoundError("Photo not found.")

        photo.meta.total_views = (photo.meta.total_views ?? 0) + 1
        await saveEntityToDatabase(photoRepository, photo)

        return PhotoResponseDTO.fromEntity(photo)
    }

    async uploadNewPhoto(user: Partial<User>, file: Express.Multer.File, requestingBody: PhotoUploadBody) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            try {
                const checkUser = await userRepository.existsBy({
                    id: user.id,
                    username: user.username
                })
                if (!checkUser) throw new NotFoundError("User not found.")

                if (!file.mimetype.includes("image"))
                    throw new BadRequestError("Invalid file type. Only images are allowed.")

                const { title, description, bird_name, bird_size, bird_habitat } = requestingBody
                if (!title || !description || !bird_size || !bird_habitat)
                    throw new BadRequestError("All fields are required. Only 'bird_name' is optional.")

                const secure_url = await this.uploadPhotoToCloudinary(file)
                const slug = title
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")

                const newPhoto = photoRepository.create({
                    title,
                    description,
                    image_url: secure_url,
                    slug,
                    meta: {
                        bird_name,
                        bird_size,
                        bird_habitat
                    },
                    author: { id: user.id, username: user.username }
                })

                await transactionalEntityManager.save(newPhoto)
            } catch (error) {
                console.error("Transaction failed:", error)
                throw new InternalServerError("An error occurred during the upload process.")
            }
        })
    }

    async deletePhoto(user: Partial<User>, photoId: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            try {
                const checkUser = await userRepository.existsBy({
                    id: user.id,
                    username: user.username
                })
                if (!checkUser) throw new NotFoundError("User not found.")

                if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")

                const photoToDelete = await photoRepository.findOne({
                    where: { id: photoId, author: { id: user.id } },
                    relations: ["author"]
                })
                if (!photoToDelete) throw new NotFoundError("Photo not found.")

                const publicId = this.extractPublicId(photoToDelete.image_url)
                if (!publicId) throw new InternalServerError("Invalid image.")

                await this.deletePhotoFromCloudinary(publicId)

                await transactionalEntityManager.remove(photoToDelete)
            } catch (error) {
                console.error("Transaction failed:", error)
                throw new InternalServerError("An error occurred during the deletion process.")
            }
        })
    }

    async toggleLike(user: Partial<User>, photoId: string) {
        return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")

            const photo = await photoRepository.findOne({ where: { id: photoId }, relations: ["meta"] })
            if (!photo) throw new NotFoundError("Photo not found.")

            let like = await likeRepository.findOne({ where: { user: { id: user.id }, photo: { id: photoId } } })

            if (like) {
                await transactionalEntityManager.remove(like)
                photo.meta.total_likes = (photo.meta.total_likes || 0) - 1
                await transactionalEntityManager.save(photo)
                return {
                    is_liked: false,
                    total_likes: photo.meta.total_likes
                }
            } else {
                like = new UserLike()
                like.user = user as User
                like.photo = photo as Photo
                await transactionalEntityManager.save(like)
                photo.meta.total_likes = (photo.meta.total_likes || 0) + 1
                await transactionalEntityManager.save(photo)
                return LikeResponseDTO.fromEntity(like, true, photo.meta.total_likes)
            }
        })
    }

    private async uploadPhotoToCloudinary(file: Express.Multer.File): Promise<string> {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        const result = await this.streamUpload(file)

        return result.secure_url
    }

    private async streamUpload(file: Express.Multer.File): Promise<{
        secure_url: string
    }> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "birdy-next_uploads",
                    format: "jpg",
                    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
                    allowed_formats: ["jpg", "png"]
                },
                (error: unknown, result?: { secure_url: string }) => {
                    if (result) resolve(result)
                    else reject(new Error("An error occurred during upload."))
                }
            )
            streamifier.createReadStream(file.buffer).pipe(stream)
        })
    }

    private async deletePhotoFromCloudinary(publicId: string) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error: unknown, result?: { result?: string }) => {
                if (result) resolve(result)
                else reject(new Error("An error occurred during deletion."))
            })
        })
    }

    private extractPublicId(imageUrl: string) {
        const parts = imageUrl.split("/")
        const fileName = parts.pop()
        const folderName = parts.pop()

        return folderName && fileName ? `${folderName}/${fileName.split(".")[0]}` : undefined
    }
}
