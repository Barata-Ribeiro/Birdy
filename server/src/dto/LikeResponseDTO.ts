import type { Photo } from "../entity/Photo"
import type { User } from "../entity/User"
import { UserLike } from "../entity/UserLike"

export class LikeResponseDTO {
    id: string
    user: Partial<User>
    photo: Partial<Photo>
    liked_at: Date
    is_liked?: boolean
    total_likes?: number

    static fromEntity(like: UserLike, isLiked?: boolean, totalLikes?: number) {
        const dto = new LikeResponseDTO()
        
        dto.id = like.id
        dto.user = { id: like.user.id, username: like.user.username }
        dto.photo = { id: like.photo.id }
        dto.liked_at = like.liked_at
        dto.is_liked = isLiked
        dto.total_likes = totalLikes
        
        return dto
    }
}
