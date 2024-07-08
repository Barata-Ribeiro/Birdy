interface RawData {
    id: string
    username: string
    display_name: string
    role: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    created_at: Date
    updated_at: Date
    photoCount: number
    likedPhotoCount: number
    followingCount: number
    followerCount: number
    commentCount: number
}

export class PublicProfileResponseDTO {
    id: string
    username: string
    display_name: string
    role: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    created_at: Date
    updated_at: Date
    photo_count: number
    liked_photo_count: number
    following_count: number
    follower_count: number
    comment_count: number

    static fromRaw(data: RawData): PublicProfileResponseDTO {
        const dto = new PublicProfileResponseDTO()

        dto.id = data.id
        dto.username = data.username
        dto.display_name = data.display_name
        dto.role = data.role
        dto.avatar_url = data.avatar_url
        dto.cover_image_url = data.cover_image_url
        dto.bio = data.bio
        dto.created_at = data.created_at
        dto.updated_at = data.updated_at
        dto.photo_count = +data.photoCount
        dto.liked_photo_count = +data.likedPhotoCount
        dto.following_count = +data.followingCount
        dto.follower_count = +data.followerCount
        dto.comment_count = +data.commentCount

        return dto
    }
}
