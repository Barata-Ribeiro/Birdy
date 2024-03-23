import { User } from "../entity/User"
import { UserRole } from "../entity/enums/Roles"

export class AuthRegisterResponseDTO {
    id: string
    username: string
    display_name: string
    email: string
    role: UserRole
    createdAt: Date
    updatedAt: Date

    static fromEntity(user: User): AuthRegisterResponseDTO {
        const dto = new AuthRegisterResponseDTO()

        dto.id = user.id
        dto.username = user.username
        dto.display_name = user.display_name
        dto.email = user.email
        dto.role = user.role
        dto.createdAt = user.createdAt
        dto.updatedAt = user.updatedAt

        return dto
    }
}
