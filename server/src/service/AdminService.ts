import bcrypt from "bcrypt"
import { EditUserResponseDTO } from "../dto/EditUserResponseDTO"
import { UserRole } from "../entity/enums/Roles"
import { UserEditProfileBody } from "../interface/UserInterface"
import { BadRequestError, NotFoundError } from "../middleware/helpers/ApiErrors"
import { userRepository } from "../repository/UserRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isPasswordStrong, isUsernameValid } from "../utils/validity-functions"

export class AdminService {
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

        if (body.username) {
            if (!isUsernameValid(body.username))
                throw new BadRequestError(
                    "The username must be between 4 and 20 characters long, and can only contain letters and numbers."
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
                throw new BadRequestError("Already using this avatar.")

            if (!body.avatar_url.startsWith("https://"))
                throw new BadRequestError("Invalid URL.")

            user.avatar_url = String(body.avatar_url.trim())
        }

        if (body.cover_image_url) {
            if (body.cover_image_url === user.cover_image_url)
                throw new BadRequestError("Already using this cover image.")

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
                    "The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
                )

            const hashedPassword = await bcrypt.hash(body.new_password, 10)

            user.password = hashedPassword
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

        if (role !== "member" && role !== "admin")
            throw new BadRequestError("Invalid role.")

        if (user.role === UserRole.BANNED)
            throw new BadRequestError("User is banned.")

        if (user.role === UserRole.ADMIN && role === "admin")
            throw new BadRequestError("User is already an admin.")

        if (user.role === UserRole.MEMBER && role === "member")
            throw new BadRequestError("User is already a member.")

        if (role === "member") user.role = UserRole.MEMBER
        else user.role = UserRole.ADMIN

        await saveEntityToDatabase(userRepository, user)
    }
}
