import type { NextFunction, Request, Response } from "express"
import { UserRole } from "../entity/enums/Roles"
import { userRepository } from "../repository/UserRepository"
import { attemptToGetUserIdFromToken } from "../utils/operation-functions"
import {
    ForbiddenError,
    NotFoundError,
    UnauthorizedError
} from "./helpers/ApiErrors"

const authMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers
        if (!authorization)
            throw new UnauthorizedError("Authorization header is required.")

        const token = authorization.split(" ")[1]
        if (!token)
            throw new UnauthorizedError(
                "Your request is missing an authorization token."
            )

        const secretKey = process.env.JWT_SECRET_KEY
        if (!secretKey)
            throw new NotFoundError(
                "The server is missing its JWT secret key. You should report this issue to the administrator."
            )

        let id: string
        id = attemptToGetUserIdFromToken(token, secretKey)

        const userFromDatabase = await userRepository.findOneBy({ id })
        if (!userFromDatabase) throw new NotFoundError("User not found.")

        if (userFromDatabase.role === UserRole.BANNED)
            throw new ForbiddenError("You are banned.")

        req.user = {
            data: {
                id: userFromDatabase.id,
                username: userFromDatabase.username,
                display_name: userFromDatabase.display_name,
                email: userFromDatabase.email,
                role: userFromDatabase.role,
                createdAt: userFromDatabase.createdAt,
                updatedAt: userFromDatabase.updatedAt
            },
            is_admin: userFromDatabase.role === UserRole.ADMIN
        }

        next()
    } catch (error) {
        console.error("Authenticating user failed: ", error)
        next(error)
    }
}

export default authMiddleware
