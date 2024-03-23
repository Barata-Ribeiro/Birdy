import bcrypt from "bcrypt"
import { AuthRegisterResponseDTO } from "../dto/AuthRegisterResponseDTO"
import { AuthUserRegisterBody } from "../interface/AuthInterfaces"
import { BadRequestError, ConflictError } from "../middleware/helpers/ApiErrors"
import { saveEntityToDatabase } from "../utils/operation-functions"
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
}
