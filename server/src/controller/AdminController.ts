import type { Request, Response } from "express"
import { UserRole } from "../entity/enums/Roles"
import {
    BadRequestError,
    ForbiddenError
} from "../middleware/helpers/ApiErrors"
import { AdminService } from "../service/AdminService"

export class AdminController {
    private adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }

    async getUserInfo(req: Request, res: Response) {
        const username = this.verifyRequestingUser(req)

        const response = await this.adminService.getUserInfo(username)

        return res.status(200).json({
            status: "success",
            message: "User info fetched successfully.",
            data: response
        })
    }

    async updateUserInfo(req: Request, res: Response) {
        // update user info
    }

    async deleteUser(req: Request, res: Response) {
        // delete user
    }

    private verifyRequestingUser(req: Request) {
        const { username } = req.params
        if (!username) throw new BadRequestError("Username is required.")

        const requestingUser = req.user
        if (!requestingUser.data)
            throw new BadRequestError("You must be authenticated.")

        if (
            !requestingUser.is_admin ||
            requestingUser.data.role !== UserRole.ADMIN
        )
            throw new ForbiddenError(
                "You are not an administrator of this service."
            )

        if (requestingUser.data.username === username)
            throw new BadRequestError(
                "You cannot perform this action on yourself."
            )

        return username
    }
}
