import { User } from "../entity/User"

export class EditUserResponseDTO {
    id: string
    username: string
    display_name: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    updatedAt: Date

    static fromEntity(user: User): EditUserResponseDTO {
        const dto = new EditUserResponseDTO()

        dto.id = user.id
        dto.username = user.username
        dto.display_name = user.display_name
        dto.avatar_url = user.avatar_url || undefined
        dto.cover_image_url = user.cover_image_url || undefined
        dto.bio = user.bio || undefined
        dto.updatedAt = user.updatedAt

        return dto
    }
}
