import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { AuthRegisterResponseDTO } from "../dto/AuthRegisterResponseDTO"
import {
    AuthLoginServiceResponse,
    AuthUserLoginBody,
    AuthUserRegisterBody
} from "../interface/AuthInterfaces"
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
    UnauthorizedError
} from "../middleware/helpers/ApiErrors"
import {
    attemptToGetUserIdFromToken,
    saveEntityToDatabase
} from "../utils/operation-functions"
import {
    isEmailValid,
    isPasswordStrong,
    isUsernameValid
} from "../utils/validity-functions"
import { userRepository } from "./../repository/UserRepository"

export class AuthService {
    async register(
        body: AuthUserRegisterBody
    ): Promise<AuthRegisterResponseDTO> {
        const { username, display_name, password, email } = body
        if (!username || !display_name || !password || !email)
            throw new Error(
                "You must provide all credentials to create an account."
            )

        if (!isUsernameValid(username))
            throw new BadRequestError(
                "Your username must be between 4 and 20 characters long, and can only contain letters and numbers."
            )
        if (!isEmailValid(email)) throw new BadRequestError("Invalid email.")
        if (!isPasswordStrong(password))
            throw new BadRequestError(
                "Your password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
            )

        const checkIfUserExists = await userRepository.exists({
            where: [{ username }, { email }]
        })
        if (checkIfUserExists)
            throw new ConflictError(
                "An account already exists with the provided credentials."
            )

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userRepository.create({
            username,
            display_name,
            email,
            password: hashedPassword
        })

        const savedNewUser = await saveEntityToDatabase(userRepository, newUser)

        return AuthRegisterResponseDTO.fromEntity(savedNewUser)
    }

    async login(body: AuthUserLoginBody): Promise<AuthLoginServiceResponse> {
        const { username, password, remember_me } = body
        if (!username || !password)
            throw new BadRequestError(
                "You must provide your username and password to login."
            )

        const user = await userRepository.findOneBy({ username })
        if (!user) throw new NotFoundError("User not found.")

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch)
            throw new UnauthorizedError("Your password is incorrect.")

        const secretKey = process.env.JWT_SECRET_KEY
        if (!secretKey)
            throw new NotFoundError(
                "The server is missing its JWT secret key. You should report this issue to the administrator."
            )

        const access_token = sign({ id: user.id }, secretKey, {
            expiresIn: "15m"
        })

        const refresh_token = sign({ id: user.id }, secretKey, {
            expiresIn: remember_me ? "30d" : "1d"
        })

        return { access_token, refresh_token }
    }

    async refreshToken(refreshToken: string): Promise<string> {
        const secretKey = process.env.JWT_SECRET_KEY
        if (!secretKey)
            throw new NotFoundError(
                "The server is missing its JWT secret key. You should report this issue to the administrator."
            )

        let id: string
        id = attemptToGetUserIdFromToken(refreshToken, secretKey)

        const checkIfUserExists = await userRepository.existsBy({ id })
        if (!checkIfUserExists) throw new NotFoundError("User not found.")

        const newAccessToken = sign({ id }, secretKey, { expiresIn: "15m" })

        return newAccessToken
    }
}
