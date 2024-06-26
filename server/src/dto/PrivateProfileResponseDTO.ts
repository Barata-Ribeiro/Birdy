import { Comment } from "../entity/Comment"
import { Photo } from "../entity/Photo"
import { User } from "../entity/User"
import { UserRole } from "../entity/enums/Roles"

type Data = User & {
    photoCount: number
    likedPhotoCount: number
    lastLikedPhotos: Partial<Photo>[]
    followingCount: number
    followerCount: number
    commentCount: number
    lastCommentsMade: Partial<Comment>[]
}

export class PrivateProfileResponseDTO {
    id: string
    username: string
    display_name: string
    email: string
    role: UserRole
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

    static fromRaw(data: Data): PrivateProfileResponseDTO {
        const dto = new PrivateProfileResponseDTO()

        dto.id = data.id
        dto.username = data.username
        dto.display_name = data.display_name
        dto.email = data.email
        dto.role = data.role
        dto.avatar_url = data.avatar_url
        dto.cover_image_url = data.cover_image_url
        dto.bio = data.bio
        dto.photo_count = +data.photoCount
        dto.liked_photo_count = +data.likedPhotoCount
        dto.last_liked_photos = data.lastLikedPhotos ?? []
        dto.following_count = +data.followingCount
        dto.follower_count = +data.followerCount
        dto.comment_count = +data.commentCount
        dto.last_comments_made = data.lastCommentsMade ?? []

        return dto
    }
}
