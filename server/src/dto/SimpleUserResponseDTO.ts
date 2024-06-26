import { User } from "../entity/User"
import { UserRole } from "../entity/enums/Roles"

export class SimpleUserResponseDTO {
    id: string
    username: string
    display_name: string
    email: string
    role: UserRole
    avatar_url?: string
    createdAt: Date
    updatedAt: Date

    static fromEntity(user: User): SimpleUserResponseDTO {
        const dto = new SimpleUserResponseDTO()

        dto.id = user.id
        dto.username = user.username
        dto.display_name = user.display_name
        dto.email = user.email
        dto.role = user.role
        dto.avatar_url = user.avatar_url ?? undefined
        dto.createdAt = user.createdAt
        dto.updatedAt = user.updatedAt

        return dto
    }
}
