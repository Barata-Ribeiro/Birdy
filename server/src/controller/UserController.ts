import type { Request, Response } from "express"
import { SimpleUserResponseDTO } from "../dto/SimpleUserResponseDTO"
import { UserEditProfileBody } from "../interface/UserInterface"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { userRepository } from "../repository/UserRepository"
import UserService from "../service/UserService"
import { isUUIDValid } from "../utils/validity-functions"

export default class UserController {
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
                "email",
                "role",
                "avatar_url",
                "createdAt",
                "updatedAt"
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
        const userId = this.validateUserIdAndOwnership(req)

        const response = await this.userService.getPrivateProfile(userId)

        return res.status(200).json({
            status: "success",
            message: "Your profile fetched successfully.",
            data: response
        })
    }

    public async updatePrivateProfile(req: Request, res: Response) {
        const userId = this.validateUserIdAndOwnership(req)

        const requestingBody = req.body as UserEditProfileBody
        if (!requestingBody)
            throw new BadRequestError(
                "You must provide data to update your profile."
            )

        const response = await this.userService.updatePrivateProfile(
            userId,
            requestingBody
        )

        return res.status(200).json({
            status: "success",
            message: "Your profile updated successfully.",
            data: response
        })
    }

    public async deletePrivateProfile(req: Request, res: Response) {
        const userId = this.validateUserIdAndOwnership(req)

        await this.userService.deletePrivateProfile(userId)

        return res.status(204).json({
            status: "success",
            message: "Your profile has been deleted successfully."
        })
    }

    private validateUserIdAndOwnership(req: Request) {
        const { userId } = req.params
        if (!userId) throw new BadRequestError("User ID is required.")

        if (!isUUIDValid(userId)) throw new BadRequestError("Invalid user ID.")

        if (req.user.data?.id !== userId)
            throw new BadRequestError(
                "You are not authorized to delete this profile."
            )

        return userId
    }
}
