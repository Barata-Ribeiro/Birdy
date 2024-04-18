import { Comment } from "../entity/Comment"

export class CommentResponseDTO {
    id: string
    content: string
    author_id: string
    author_username: string
    author_name: string
    photo_id: string
    was_edited: boolean
    created_at: Date
    updated_at: Date

    static fromEntity(comment: Comment): CommentResponseDTO {
        const dto = new CommentResponseDTO()

        dto.id = comment.id
        dto.content = comment.content
        dto.author_id = comment.author.id
        dto.author_username = comment.author.username
        dto.author_name = comment.author.display_name
        dto.photo_id = comment.photo.id
        dto.was_edited = comment.was_edited
        dto.created_at = comment.createdAt
        dto.updated_at = comment.updatedAt

        return dto
    }
}
