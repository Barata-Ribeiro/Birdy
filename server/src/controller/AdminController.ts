import type { Request, Response } from "express"
import { UserRole } from "../entity/enums/Roles"
import { UserEditProfileBody } from "../interface/UserInterface"
import { BadRequestError, ForbiddenError } from "../middleware/helpers/ApiErrors"
import { AdminService } from "../service/AdminService"

export class AdminController {
    private adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }

    // User related methods
    async getUserInfo(req: Request, res: Response) {
        const username = this.verifyRequestingUser(req)

        const response = await this.adminService.getUserInfo(username)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "User info fetched successfully.",
            data: response
        })
    }

    async updateUserInfo(req: Request, res: Response) {
        const username = this.verifyRequestingUser(req)
        const requestingBody = req.body as Partial<UserEditProfileBody>
        if (!requestingBody) throw new BadRequestError("You must provide data to update this user.")

        const response = await this.adminService.updateUserInfo(username, requestingBody)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message:
                "User updated successfully. Inform the user of the changes and the new authentication credentials.",
            data: response
        })
    }

    async updateUserRole(req: Request, res: Response) {
        const username = this.verifyRequestingUser(req)
        const { role } = req.body
        if (!role) throw new BadRequestError("Role is required.")

        await this.adminService.updateUserRole(username, role)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "User role updated successfully."
        })
    }

    async banUser(req: Request, res: Response) {
        const username = this.verifyRequestingUser(req)

        await this.adminService.banUser(username)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "User banned successfully."
        })
    }

    async deleteUser(req: Request, res: Response) {
        const username = this.verifyRequestingUser(req)

        await this.adminService.deleteUserAccount(username)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "User deleted successfully."
        })
    }

    // Photo related methods
    async deletePhoto(req: Request, res: Response) {
        const { photoId } = req.params
        if (!photoId) throw new BadRequestError("Photo ID is required.")

        const requestingUser = req.user
        if (!requestingUser.data?.id) throw new BadRequestError("You must be authenticated.")

        if (!requestingUser.is_admin || requestingUser.data.role !== UserRole.ADMIN)
            throw new ForbiddenError("You are not an administrator of this service.")

        await this.adminService.deletePhoto(photoId, requestingUser.data.id)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Photo deleted successfully."
        })
    }

    // Comment related methods
    async updateComment(req: Request, res: Response) {
        const requestingUser = req.user
        const { commentId } = req.params
        const { photoId } = req.params

        if (!commentId) throw new BadRequestError("Comment ID is required.")
        const { content } = req.body
        if (!photoId) throw new BadRequestError("Photo ID is required.")
        if (!content || content.trim() === "") throw new BadRequestError("You cannot update a comment to be empty.")
        if (!requestingUser.data?.id) throw new BadRequestError("You must be authenticated.")
        if (!requestingUser.is_admin || requestingUser.data.role !== UserRole.ADMIN)
            throw new ForbiddenError("You are not an administrator of this service.")

        await this.adminService.updateComment(commentId, photoId, requestingUser.data.id, content)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Comment updated successfully."
        })
    }

    async deleteComment(req: Request, res: Response) {
        const requestingUser = req.user
        const { commentId } = req.params
        const { photoId } = req.params

        if (!commentId) throw new BadRequestError("Comment ID is required.")
        const { content } = req.body
        if (!photoId) throw new BadRequestError("Photo ID is required.")
        if (!content || content.trim() === "") throw new BadRequestError("You cannot update a comment to be empty.")
        if (!requestingUser.data?.id) throw new BadRequestError("You must be authenticated.")
        if (!requestingUser.is_admin || requestingUser.data.role !== UserRole.ADMIN)
            throw new ForbiddenError("You are not an administrator of this service.")

        await this.adminService.deleteComment(commentId, photoId, requestingUser.data.id)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Comment deleted successfully."
        })
    }

    private verifyRequestingUser(req: Request) {
        const { username } = req.params
        if (!username) throw new BadRequestError("Username is required.")

        const requestingUser = req.user
        if (!requestingUser.data) throw new BadRequestError("You must be authenticated.")

        if (!requestingUser.is_admin || requestingUser.data.role !== UserRole.ADMIN)
            throw new ForbiddenError("You are not an administrator of this service.")

        if (requestingUser.data.username === username)
            throw new BadRequestError("You cannot perform this action on yourself.")

        return username
    }
}
