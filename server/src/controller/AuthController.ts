import type { Request, Response } from "express"
import {
    AuthUserLoginBody,
    AuthUserRegisterBody
} from "../interface/AuthInterfaces"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { AuthService } from "../service/AuthService"

export class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async register(req: Request, res: Response) {
        const requestingBody = req.body as AuthUserRegisterBody
        if (!requestingBody)
            throw new BadRequestError(
                "You must provide your credentials to create an account."
            )

        const response = await this.authService.register(requestingBody)

        return res.status(201).json({
            status: "success",
            message: "Account created successfully.",
            data: response
        })
    }

    async login(req: Request, res: Response) {
        const requestingBody = req.body as AuthUserLoginBody
        if (!requestingBody)
            throw new BadRequestError(
                "You must provide your credentials to login."
            )

        const response = await this.authService.login(requestingBody)

        return res.status(200).json({
            status: "success",
            message: "You have successfully logged in.",
            data: response
        })
    }

    async refreshToken(req: Request, res: Response) {}

    async forgotPassword(req: Request, res: Response) {}

    async resetPassword(req: Request, res: Response) {}
}
