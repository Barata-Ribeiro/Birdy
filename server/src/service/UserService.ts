import bcrypt from "bcrypt"
import { AppDataSource } from "../database/data-source"
import { EditUserResponseDTO } from "../dto/EditUserResponseDTO"
import { PrivateProfileResponseDTO } from "../dto/PrivateProfileResponseDTO"
import { PublicProfileResponseDTO } from "../dto/PublicProfileResponseDTO"
import { Comment } from "../entity/Comment"
import { Photo } from "../entity/Photo"
import { UserFollow } from "../entity/UserFollow"
import { UserLike } from "../entity/UserLike"
import { UserEditProfileBody } from "../interface/UserInterface"
import {
    BadRequestError,
    InternalServerError,
    NotFoundError
} from "../middleware/helpers/ApiErrors"
import { userRepository } from "../repository/UserRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isPasswordStrong, isUsernameValid } from "../utils/validity-functions"

export default class UserService {
    async getUserProfile(username: string): Promise<PublicProfileResponseDTO> {
        const user = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id",
                "user.username",
                "user.display_name",
                "user.avatar_url",
                "user.cover_image_url",
                "user.bio"
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(photo.id)", "photoCount")
                    .from(Photo, "photo")
                    .where("photo.authorId = user.id")
            }, "photoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userLike.photoId)",
                        "likedPhotoCount"
                    )
                    .from(UserLike, "userLike")
                    .where("userLike.userId = user.id")
            }, "likedPhotoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userFollow.followingId)",
                        "followingCount"
                    )
                    .from(UserFollow, "userFollow")
                    .where("userFollow.followerId = user.id")
            }, "followingCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userFollow.followerId)",
                        "followerCount"
                    )
                    .from(UserFollow, "userFollow")
                    .where("userFollow.followingId = user.id")
            }, "followerCount")
            .where("user.username = :username", { username })
            .getRawOne()

        if (!user) throw new BadRequestError("User not found.")

        return PublicProfileResponseDTO.fromRaw(user)
    }

    async getPrivateProfile(
        userId: string
    ): Promise<PrivateProfileResponseDTO> {
        const user = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id",
                "user.username",
                "user.display_name",
                "user.email",
                "user.avatar_url",
                "user.cover_image_url",
                "user.bio"
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(photo.id)", "photoCount")
                    .from(Photo, "photo")
                    .where("photo.authorId = user.id")
            }, "photoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userLike.photoId)",
                        "likedPhotoCount"
                    )
                    .from(UserLike, "userLike")
                    .where("userLike.userId = user.id")
            }, "likedPhotoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select([
                        "photo.id",
                        "photo.title",
                        "photo.slug",
                        "photo.image_url"
                    ])
                    .from(Photo, "photo")
                    .innerJoin(UserLike, "like", "userLike.photoId = photo.id")
                    .where("like.userId = user.id")
                    .orderBy("like.liked_at", "DESC")
                    .limit(2)
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
                    .select("COUNT(comment.id)", "commentCount")
                    .from(Comment, "comment")
                    .where("comment.authorId = user.id")
            }, "commentCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select([
                        "comment.id",
                        "comment.content",
                        "comment.createdAt"
                    ])
                    .from(Comment, "comment")
                    .where("comment.authorId = user.id")
                    .orderBy("comment.createdAt", "DESC")
                    .limit(2)
            }, "lastComments")
            .where("user.id = :userId", { userId })
            .getRawOne()

        if (!user) throw new BadRequestError("User not found.")

        return PrivateProfileResponseDTO.fromRaw(user)
    }

    async updatePrivateProfile(
        userId: string,
        body: UserEditProfileBody
    ): Promise<EditUserResponseDTO> {
        if (!body.password)
            throw new BadRequestError("You must provide your current password.")

        const user = await userRepository.findOne({
            where: { id: userId },
            select: [
                "id",
                "username",
                "display_name",
                "password",
                "avatar_url",
                "cover_image_url",
                "bio",
                "updatedAt"
            ]
        })
        if (!user) throw new NotFoundError("User not found.")

        const passwordMatch = await bcrypt.compare(body.password, user.password)
        if (!passwordMatch)
            throw new BadRequestError("Your password is incorrect.")

        if (body.username) {
            if (!isUsernameValid(body.username))
                throw new BadRequestError(
                    "Your username must be between 4 and 20 characters long, and can only contain letters and numbers."
                )

            const usernameExists = await userRepository.existsBy({
                username: body.username
            })
            if (usernameExists)
                throw new BadRequestError("Username already in use.")

            user.username = body.username.toLowerCase().trim()
        }

        if (body.display_name) user.display_name = body.display_name.trim()

        if (body.avatar_url) {
            if (body.avatar_url === user.avatar_url)
                throw new BadRequestError("You are already using this avatar.")

            if (!body.avatar_url.startsWith("https://"))
                throw new BadRequestError("Invalid URL.")

            user.avatar_url = String(body.avatar_url.trim())
        }

        if (body.cover_image_url) {
            if (body.cover_image_url === user.cover_image_url)
                throw new BadRequestError(
                    "You are already using this cover image."
                )

            if (!body.cover_image_url.startsWith("https://"))
                throw new BadRequestError("Invalid URL.")

            user.cover_image_url = String(body.cover_image_url.trim())
        }

        if (body.bio) {
            if (body.bio.length > 200)
                throw new BadRequestError(
                    "Bio must be less than 200 characters."
                )

            user.bio = body.bio.trim()
        }

        if (body.new_password) {
            if (!isPasswordStrong(body.new_password))
                throw new BadRequestError(
                    "Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
                )

            const hashedPassword = await bcrypt.hash(body.new_password, 10)

            user.password = hashedPassword
        }

        const savedUser = await saveEntityToDatabase(userRepository, user)

        return EditUserResponseDTO.fromEntity(savedUser)
    }

    async deletePrivateProfile(userId: string): Promise<void> {
        await AppDataSource.manager.transaction(
            async (transactionalEntityManager) => {
                try {
                    const userToDelete = await userRepository.findOneBy({
                        id: userId
                    })
                    if (!userToDelete)
                        throw new NotFoundError("User not found.")

                    await transactionalEntityManager.remove(userToDelete)
                } catch (error) {
                    console.error("Transaction failed:", error)
                    throw new InternalServerError(
                        "An error occurred during the deletion process."
                    )
                }
            }
        )
    }
}
