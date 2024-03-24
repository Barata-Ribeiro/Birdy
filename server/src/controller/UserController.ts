import type { Request, Response } from "express"
import { SimpleUserResponseDTO } from "../dto/SimpleUserResponseDTO"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { userRepository } from "../repository/UserRepository"
import { UserService } from "../service/UserService"

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public async getAllUsers(_req: Request, res: Response) {
        const users = await userRepository.find({
            select: [
                "id",
                "username",
                "display_name",
                "avatar_url",
                "createdAt"
            ],
            order: { createdAt: "DESC" },
            cache: true
        })
        const response = users.map((user) =>
            SimpleUserResponseDTO.fromEntity(user)
        )

        return res.status(200).json({
            status: "success",
            message: "Users fetched successfully.",
            data: response
        })
    }

    public async getUserProfile(req: Request, res: Response) {
        const { username } = req.params
        if (!username) throw new BadRequestError("Username is required.")

        const response = await this.userService.getUserProfile(username)

        return res.status(200).json({
            status: "success",
            message: "User profile fetched successfully.",
            data: response
        })
    }

    public async getPrivateProfile(req: Request, res: Response) {
        const { userId } = req.params
        if (!userId) throw new BadRequestError("User ID is required.")

        if (req.user.data?.id !== userId)
            throw new BadRequestError(
                "You are not authorized to view this profile."
            )

        const response = await this.userService.getPrivateProfile(userId)

        return res.status(200).json({
            status: "success",
            message: "Your profile fetched successfully.",
            data: response
        })
    }
}
