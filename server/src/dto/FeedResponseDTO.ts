import type { Photo } from "../entity/Photo"
import type { PhotoMeta } from "../entity/PhotoMeta"
import type { User } from "../entity/User"

export class FeedResponseDTO {
    id: string
    title: string
    description: string
    image_url: string
    slug: string
    meta: PhotoMeta
    author: Partial<User>
    createdAt: Date
    updatedAt: Date

    static fromEntity(photo: Photo): FeedResponseDTO {
        const dto = new FeedResponseDTO()

        dto.id = photo.id
        dto.title = photo.title
        dto.description = photo.description
        dto.image_url = photo.image_url
        dto.slug = photo.slug
        dto.meta = photo.meta
        dto.author = {
            id: photo.author.id,
            username: photo.author.username,
            display_name: photo.author.display_name,
            avatar_url: photo.author.avatar_url
        }
        dto.createdAt = photo.createdAt
        dto.updatedAt = photo.updatedAt

        return dto
    }
}
