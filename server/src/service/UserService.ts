import bcrypt from "bcrypt"
import { AppDataSource } from "../database/data-source"
import { EditUserResponseDTO } from "../dto/EditUserResponseDTO"
import { PhotoStatsResponseDTO } from "../dto/PhotoStatsResponseDTO"
import { PrivateProfileResponseDTO } from "../dto/PrivateProfileResponseDTO"
import { PublicProfileResponseDTO } from "../dto/PublicProfileResponseDTO"
import { Comment } from "../entity/Comment"
import { Photo } from "../entity/Photo"
import { User } from "../entity/User"
import { UserFollow } from "../entity/UserFollow"
import { UserLike } from "../entity/UserLike"
import { UserEditProfileBody } from "../interface/UserInterface"
import { BadRequestError, InternalServerError, NotFoundError } from "../middleware/helpers/ApiErrors"
import { photoRepository } from "../repository/PhotoRepository"
import { userRepository } from "../repository/UserRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isPasswordStrong, isUsernameValid, isUUIDValid } from "../utils/validity-functions"

export default class UserService {
    async getUserProfile(username: string): Promise<PublicProfileResponseDTO> {
        const user = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id AS id",
                "user.username AS username",
                "user.display_name AS display_name",
                "user.email AS email",
                "user.role AS role",
                "user.avatar_url AS avatar_url",
                "user.cover_image_url AS cover_image_url",
                "user.bio AS bio",
                "user.createdAt AS created_at",
                "user.updatedAt AS updated_at"
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT photo.id)", "photoCount")
                    .from(Photo, "photo")
                    .where("photo.authorId = user.id")
            }, "photoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT userLike.id)", "likedPhotoCount")
                    .from(UserLike, "userLike")
                    .where("userLike.userId = user.id")
            }, "likedPhotoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT follower.id)", "followerCount")
                    .from(UserFollow, "follower")
                    .where("follower.followingId = user.id")
            }, "followerCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT following.id)", "followingCount")
                    .from(UserFollow, "following")
                    .where("following.followerId = user.id")
            }, "followingCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT comment.id)", "commentCount")
                    .from(Comment, "comment")
                    .where("comment.authorId = user.id")
            }, "commentCount")
            .where("user.username = :username", { username })
            .getRawOne()

        if (!user) throw new BadRequestError("User not found.")

        return PublicProfileResponseDTO.fromRaw(user)
    }

    async getUserContext(userId: string): Promise<User> {
        if (!isUUIDValid(userId)) throw new BadRequestError("Invalid user ID.")

        const user = await userRepository.findOne({
            where: { id: userId },
            select: [
                "id",
                "username",
                "display_name",
                "email",
                "role",
                "avatar_url",
                "cover_image_url",
                "bio",
                "createdAt",
                "updatedAt"
            ]
        })
        if (!user) throw new NotFoundError("User not found.")

        return user
    }

    async getPrivateProfile(userId: string): Promise<PrivateProfileResponseDTO> {
        const user = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id AS id",
                "user.username AS username",
                "user.display_name AS display_name",
                "user.email AS email",
                "user.role AS role",
                "user.avatar_url AS avatar_url",
                "user.cover_image_url AS cover_image_url",
                "user.bio AS bio"
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT photo.id)", "photoCount")
                    .from(Photo, "photo")
                    .where("photo.authorId = user.id")
            }, "photoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT userLike.id)", "likedPhotoCount")
                    .from(UserLike, "userLike")
                    .where("userLike.userId = user.id")
            }, "likedPhotoCount")
            .addSelect((subQuery) => {
                return subQuery.select("json_agg(subquery) AS lastLikedPhotos").from((qb) => {
                    return qb
                        .select(["photo.id", "photo.title", "photo.slug", "photo.image_url"])
                        .from(Photo, "photo")
                        .innerJoin(UserLike, "userLike", "userLike.photoId = photo.id")
                        .where("userLike.userId = user.id")
                        .orderBy("userLike.liked_at", "DESC")
                        .limit(2)
                }, "subquery")
            }, "lastLikedPhotos")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT follower.id)", "followerCount")
                    .from(UserFollow, "follower")
                    .where("follower.followingId = user.id")
            }, "followerCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT following.id)", "followingCount")
                    .from(UserFollow, "following")
                    .where("following.followerId = user.id")
            }, "followingCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT comment.id)", "commentCount")
                    .from(Comment, "comment")
                    .where("comment.authorId = user.id")
            }, "commentCount")
            .addSelect((subQuery) => {
                return subQuery.select("json_agg(subquery) AS lastComments").from((qb) => {
                    return qb
                        .select(["comment.id", "comment.content", "comment.createdAt"])
                        .from(Comment, "comment")
                        .where("comment.authorId = user.id")
                        .orderBy("comment.createdAt", "DESC")
                        .limit(2)
                }, "subquery")
            }, "lastComments")
            .where("user.id = :userId", { userId })
            .getRawOne()

        if (!user) throw new BadRequestError("User not found.")

        return PrivateProfileResponseDTO.fromRaw(user)
    }

    async getUserPhotosStats(userId: string) {
        if (!isUUIDValid(userId)) throw new BadRequestError("Invalid user ID.")

        const [latestPhotos, totalLatest] = await photoRepository
            .createQueryBuilder("photo")
            .select([
                "photo.id",
                "photo.title",
                "photo.meta.total_likes",
                "photo.meta.total_comments",
                "photo.meta.total_views",
                "photo.createdAt"
            ])
            .where("photo.authorId = :userId", { userId })
            .orderBy("photo.createdAt", "DESC")
            .limit(3)
            .getManyAndCount()

        const latestPhotosDTO = latestPhotos.map((photo) => PhotoStatsResponseDTO.fromEntity(photo))

        const [popularPhotos, totalPopular] = await photoRepository
            .createQueryBuilder("photo")
            .select([
                "photo.id",
                "photo.title",
                "photo.meta.total_likes",
                "photo.meta.total_comments",
                "photo.meta.total_views",
                "photo.createdAt"
            ])
            .where("photo.authorId = :userId", { userId })
            .orderBy("photo.meta.total_views", "DESC")
            .limit(3)
            .getManyAndCount()

        const popularPhotosDTO = popularPhotos.map((photo) => PhotoStatsResponseDTO.fromEntity(photo))

        return {
            total_photos: totalLatest + totalPopular,
            latest_photos: {
                total: totalLatest ?? 0,
                photos: latestPhotosDTO ?? []
            },
            popular_photos: {
                total: totalPopular ?? 0,
                photos: popularPhotosDTO ?? []
            }
        }
    }

    async updatePrivateProfile(userId: string, body: UserEditProfileBody): Promise<EditUserResponseDTO> {
        if (!body.password) throw new BadRequestError("You must provide your current password.")

        const user = await userRepository.findOne({
            where: { id: userId },
            select: ["id", "username", "display_name", "password", "avatar_url", "cover_image_url", "bio", "updatedAt"]
        })
        if (!user) throw new NotFoundError("User not found.")

        const passwordMatch = await bcrypt.compare(body.password, user.password)
        if (!passwordMatch) throw new BadRequestError("Your password is incorrect.")

        if (body.username) {
            if (!isUsernameValid(body.username))
                throw new BadRequestError(
                    "Your username must be between 4 and 20 characters long, and can only contain letters and numbers."
                )

            const usernameExists = await userRepository.existsBy({
                username: body.username
            })
            if (usernameExists) throw new BadRequestError("Username already in use.")

            user.username = body.username.toLowerCase().trim()
        }

        if (body.display_name) user.display_name = body.display_name.trim()

        if (body.avatar_url) {
            if (body.avatar_url === user.avatar_url) throw new BadRequestError("You are already using this avatar.")

            if (!body.avatar_url.startsWith("https://")) throw new BadRequestError("Invalid URL.")

            user.avatar_url = String(body.avatar_url.trim())
        }

        if (body.cover_image_url) {
            if (body.cover_image_url === user.cover_image_url)
                throw new BadRequestError("You are already using this cover image.")

            if (!body.cover_image_url.startsWith("https://")) throw new BadRequestError("Invalid URL.")

            user.cover_image_url = String(body.cover_image_url.trim())
        }

        if (body.bio) {
            if (body.bio.length > 200) throw new BadRequestError("Bio must be less than 200 characters.")

            user.bio = body.bio.trim()
        }

        if (body.new_password) {
            if (!isPasswordStrong(body.new_password))
                throw new BadRequestError(
                    "Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
                )

            user.password = await bcrypt.hash(body.new_password, 10)
        }

        const savedUser = await saveEntityToDatabase(userRepository, user)

        return EditUserResponseDTO.fromEntity(savedUser)
    }

    async deletePrivateProfile(userId: string): Promise<void> {
        await AppDataSource.manager.transaction("SERIALIZABLE", async (transactionalEntityManager) => {
            const userToDelete = await userRepository.findOneBy({
                id: userId
            })
            if (!userToDelete) throw new NotFoundError("User not found.")

            try {
                await transactionalEntityManager.remove(userToDelete)
            } catch (error) {
                console.error("Transaction failed: ", error)
                throw new InternalServerError("An error occurred during the deletion process.")
            }
        })
    }
}
