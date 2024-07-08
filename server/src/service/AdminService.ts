import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import { AppDataSource } from "../database/data-source"
import { EditUserResponseDTO } from "../dto/EditUserResponseDTO"
import { UserRole } from "../entity/enums/Roles"
import { UserEditProfileBody } from "../interface/UserInterface"
import { BadRequestError, InternalServerError, NotFoundError } from "../middleware/helpers/ApiErrors"
import { commentRepository } from "../repository/CommentRepository"
import { photoRepository } from "../repository/PhotoRepository"
import { userRepository } from "../repository/UserRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isPasswordStrong, isUsernameValid, isUUIDValid } from "../utils/validity-functions"

export class AdminService {
    // User related methods
    async getUserInfo(username: string) {
        const userToFetch = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id",
                "user.username",
                "user.display_name",
                "user.email",
                "user.role",
                "user.avatar_url",
                "user.cover_image_url",
                "user.bio",
                "user.createdAt",
                "user.updatedAt"
            ])
            .where("user.username = :username", { username })
            .getOne()
        if (!userToFetch) throw new NotFoundError("User not found.")

        return userToFetch
    }

    async updateUserInfo(username: string, body: Partial<UserEditProfileBody>) {
        const user = await userRepository.findOne({
            where: { username },
            select: ["id", "username", "display_name", "password", "avatar_url", "cover_image_url", "bio", "updatedAt"]
        })
        if (!user) throw new NotFoundError("User not found.")

        if (body.username) {
            if (!isUsernameValid(body.username))
                throw new BadRequestError(
                    "The username must be between 4 and 20 characters long, and can only contain letters and numbers."
                )

            const usernameExists = await userRepository.existsBy({
                username: body.username
            })
            if (usernameExists) throw new BadRequestError("Username already in use.")

            user.username = body.username.toLowerCase().trim()
        }

        if (body.display_name) user.display_name = body.display_name.trim()

        if (body.avatar_url) {
            if (body.avatar_url === user.avatar_url) throw new BadRequestError("Already using this avatar.")

            if (!body.avatar_url.startsWith("https://")) throw new BadRequestError("Invalid URL.")

            user.avatar_url = String(body.avatar_url.trim())
        }

        if (body.cover_image_url) {
            if (body.cover_image_url === user.cover_image_url)
                throw new BadRequestError("Already using this cover image.")

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
                    "The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
                )

            user.password = await bcrypt.hash(body.new_password, 10)
        }

        const savedUser = await saveEntityToDatabase(userRepository, user)

        return EditUserResponseDTO.fromEntity(savedUser)
    }

    async updateUserRole(username: string, role: string) {
        const user = await userRepository.findOne({
            where: { username },
            select: ["id", "role"]
        })
        if (!user) throw new NotFoundError("User not found.")

        role = role.toLowerCase().trim()

        if (role !== "member" && role !== "admin") throw new BadRequestError("Invalid role.")

        if (user.role === UserRole.BANNED) throw new BadRequestError("User is banned.")

        if (user.role === UserRole.ADMIN && role === "admin") throw new BadRequestError("User is already an admin.")

        if (user.role === UserRole.MEMBER && role === "member") throw new BadRequestError("User is already a member.")

        if (role === "member") user.role = UserRole.MEMBER
        else user.role = UserRole.ADMIN

        await saveEntityToDatabase(userRepository, user)
    }

    async banUser(username: string) {
        const user = await userRepository.findOne({
            where: { username },
            select: ["id", "role"]
        })
        if (!user) throw new NotFoundError("User not found.")

        if (user.role === UserRole.BANNED) throw new BadRequestError("User is already banned.")

        user.role = UserRole.BANNED

        await saveEntityToDatabase(userRepository, user)
    }

    async deleteUserAccount(username: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            try {
                const userToDelete = await userRepository.findOneBy({
                    username
                })
                if (!userToDelete) throw new NotFoundError("User not found.")

                await transactionalEntityManager.remove(userToDelete)
            } catch (error) {
                console.error("Transaction failed:", error)
                throw new InternalServerError("An error occurred during the deletion process.")
            }
        })
    }

    // Photo related methods
    async deletePhoto(photoId: string, userId: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            try {
                if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")
                if (!isUUIDValid(userId)) throw new BadRequestError("Invalid user ID.")

                const photoToDelete = await photoRepository.findOne({
                    where: { id: photoId },
                    relations: ["author"]
                })
                if (!photoToDelete) throw new NotFoundError("Photo not found.")

                if (photoToDelete.author.id === userId)
                    throw new BadRequestError(
                        "You must use the regular photo deletion method to delete your own photos."
                    )

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

    // Comment related methods
    async updateComment(commentId: string, photoId: string, userId: string, content: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            try {
                if (!isUUIDValid(commentId)) throw new BadRequestError("Invalid comment ID.")
                if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")

                const comment = await commentRepository.findOne({
                    where: { id: commentId, photo: { id: photoId } },
                    relations: ["author", "photo"]
                })
                if (!comment) throw new NotFoundError("Comment not found.")

                if (comment.author.id === userId)
                    throw new BadRequestError("Use the regular comment update method to update your own comments.")

                comment.content = content.trim()
                comment.was_edited = true

                await transactionalEntityManager.save(comment)
            } catch (error) {
                console.error("Transaction failed:", error)
                throw new InternalServerError("An error occurred during the update process.")
            }
        })
    }

    async deleteComment(commentId: string, photoId: string, userId: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            try {
                if (!isUUIDValid(commentId)) throw new BadRequestError("Invalid comment ID.")
                if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")

                const commentToDelete = await commentRepository.findOne({
                    where: { id: commentId, photo: { id: photoId } },
                    relations: ["author", "photo"]
                })
                if (!commentToDelete) throw new NotFoundError("Comment not found.")

                if (commentToDelete.author.id === userId)
                    throw new BadRequestError("Use the regular comment deletion method to delete your own comments.")

                await transactionalEntityManager.remove(commentToDelete)
            } catch (error) {
                console.error("Transaction failed:", error)
                throw new InternalServerError("An error occurred during the deletion process.")
            }
        })
    }

    private async deletePhotoFromCloudinary(publicId: string) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        return new Promise((resolve, reject) => {
            return cloudinary.uploader.destroy(publicId, (error: unknown, result?: { result?: string }) => {
                if (result) resolve(result)
                else reject(new Error("Failed to delete image."))
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
