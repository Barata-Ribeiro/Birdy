import type { Request, Response } from "express"
import { AuthUserLoginBody, AuthUserRegisterBody } from "../interface/AuthInterfaces"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import AuthService from "../service/AuthService"

export default class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async register(req: Request, res: Response) {
        const requestingBody = req.body as AuthUserRegisterBody
        if (!requestingBody) throw new BadRequestError("You must provide your credentials to create an account.")

        const response = await this.authService.register(requestingBody)

        return res.status(201).json({
            status: "success",
            code: res.statusCode,
            message: "Account created successfully.",
            data: response
        })
    }

    async login(req: Request, res: Response) {
        const requestingBody = req.body as AuthUserLoginBody
        if (!requestingBody) throw new BadRequestError("You must provide your credentials to login.")

        const response = await this.authService.login(requestingBody)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "You have successfully logged in.",
            data: { user: response.user, auth_token: response.auth_token }
        })
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body
        if (!email) throw new BadRequestError("You must provide an email to reset password.")

        await this.authService.forgotPassword(email)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "A reset password link has been sent to your email."
        })
    }

    async resetPassword(req: Request, res: Response) {
        const { userId, token } = req.params as {
            userId: string
            token: string
        }
        if (!userId || !token) throw new BadRequestError("You must provide a user ID and token to reset password.")

        const { password } = req.body as { password: string }
        if (!password) throw new BadRequestError("You must provide a new password.")

        await this.authService.resetPassword(userId, token, password)

        return res.status(200).json({
            status: "success",
            code: res.statusCode,
            message: "Your password has been reset successfully."
        })
    }
}
