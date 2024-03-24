import { Comment } from "../entity/Comment"
import { Photo } from "../entity/Photo"

export class PrivateProfileResponseDTO {
    id: string
    username: string
    display_name: string
    email: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    photo_count: number
    liked_photo_count: number
    last_liked_photos: Partial<Photo>[]
    following_count: number
    follower_count: number
    comment_count: number
    last_comments_made: Partial<Comment>[]

    static fromRaw(data: any): PrivateProfileResponseDTO {
        const dto = new PrivateProfileResponseDTO()

        dto.id = data.id
        dto.username = data.username
        dto.display_name = data.display_name
        dto.email = data.email
        dto.avatar_url = data.avatar_url || null
        dto.cover_image_url = data.cover_image_url || null
        dto.bio = data.bio || null
        dto.photo_count = +data.photoCount || 0
        dto.liked_photo_count = +data.likedPhotoCount || 0
        dto.last_liked_photos = data.lastLikedPhotos || []
        dto.following_count = +data.followingCount || 0
        dto.follower_count = +data.followerCount || 0
        dto.comment_count = +data.commentCount || 0
        dto.last_comments_made = data.lastCommentsMade || []

        return dto
    }
}
