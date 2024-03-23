import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import nodemailer, { SendMailOptions } from "nodemailer"
import { AuthRegisterResponseDTO } from "../dto/AuthRegisterResponseDTO"
import {
    AuthLoginServiceResponse,
    AuthUserLoginBody,
    AuthUserRegisterBody
} from "../interface/AuthInterfaces"
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
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

        const user = await userRepository
            .createQueryBuilder("user")
            .where("user.username = :username", { username })
            .select(["user.id", "user.password"])
            .getOne()
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

    async forgotPassword(email: string): Promise<void> {
        const user = await userRepository
            .createQueryBuilder("user")
            .where("user.email = :email", { email })
            .select([
                "user.id",
                "user.display_name",
                "user.email",
                "user.password"
            ])
            .getOne()
        if (!user) throw new NotFoundError("User not found.")

        const secretKey = process.env.JWT_SECRET_KEY
        if (!secretKey)
            throw new NotFoundError(
                "The server is missing its JWT secret key. You should report this issue to the administrator."
            )

        const signKey = secretKey + user.password

        const payload = { id: user.id, email: user.email }

        const token = sign(payload, signKey, { expiresIn: "15m" })

        const frontEndOrigin =
            process.env.FRONTEND_ORIGIN || "https://localhost:5173/"

        const resetPasswordLink = `${frontEndOrigin}/reset-password/${user.id}/${token}`

        const emailMessage = `Hello🖖, there, ${user.display_name}!\n\n
        We have received a request to reset your password. Please click on the following link to reset your password: ${resetPasswordLink}\n\n
        This link will expire in 15 minutes. If you did not request this, please ignore this email and your password will remain unchanged.\n\n`

        const emailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    color: #fff;
                    background-color: #007BFF;
                    border-radius: 5px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Hello🖖, there, ${user.display_name}!</h2>
                <p>We have received a request to reset your password. Please click on the following link to reset your password:</p>
                <a href="${resetPasswordLink}" class="button" target="_blank" rel="noopener noreferrer">Reset Password</a>
                <p>This link will expire in 15 minutes. If you did not request this, please ignore this email and your password will remain unchanged.</p>
            </div>
        </body>
        </html>`

        try {
            await this.sendMail({
                to: user.email,
                subject: "Birdy - Password Reset",
                text: emailMessage,
                html: emailHTML
            })
        } catch (error) {
            throw new InternalServerError(
                "There was an error sending the email for password reset. Please, try again later."
            )
        }
    }

    private async sendMail(options: SendMailOptions): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: process.env.ORIGIN_HOST,
            port: Number(process.env.ORIGIN_PORT),
            auth: {
                user: process.env.ORIGIN_AUTH_USER,
                pass: process.env.ORIGIN_AUTH_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.ORIGIN_MAIL_FROM,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        }

        await transporter.sendMail(mailOptions)
    }
}
