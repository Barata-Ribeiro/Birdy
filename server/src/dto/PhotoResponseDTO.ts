import { Comment } from "../entity/Comment"
import { Photo } from "../entity/Photo"
import type { PhotoMeta } from "../entity/PhotoMeta"
import { User } from "../entity/User"
import { UserLike } from "../entity/UserLike"

export class PhotoResponseDTO {
    id: string
    title: string
    description: string
    image_url: string
    slug: string
    meta: PhotoMeta
    author: Partial<User>
    likes: Partial<UserLike>[]
    comments: Partial<Comment>[]
    created_at: Date
    updated_at: Date

    static fromEntity(photo: Photo): PhotoResponseDTO {
        const dto = new PhotoResponseDTO()

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
        dto.likes =
            photo.likes?.map((like) => ({
                id: like.id,
                user_id: like.user.id,
                photo_id: like.photo.id,
                liked_at: like.liked_at
            })) ?? []
        dto.comments =
            photo.comments?.map((comment) => ({
                id: comment.id,
                content: comment.content,
                author_id: comment.author.id,
                author_username: comment.author.username,
                author_name: comment.author.display_name,
                photo_id: comment.photo.id,
                was_edited: comment.was_edited,
                created_at: comment.createdAt,
                updated_at: comment.updatedAt
            })) ?? []
        dto.created_at = photo.createdAt
        dto.updated_at = photo.updatedAt

        return dto
    }
}
