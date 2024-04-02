import { NotFoundError } from "../middleware/helpers/ApiErrors"
import { userRepository } from "../repository/UserRepository"

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
}
