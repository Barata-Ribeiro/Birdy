export class PublicProfileResponseDTO {
    id: string
    username: string
    display_name: string
    role: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    photo_count: number
    liked_photo_count: number
    following_count: number
    follower_count: number
    created_at: Date

    static fromRaw(data: any): PublicProfileResponseDTO {
        const dto = new PublicProfileResponseDTO()

        dto.id = data.id
        dto.username = data.username
        dto.display_name = data.display_name
        dto.avatar_url = data.avatar_url
        dto.cover_image_url = data.cover_image_url
        dto.bio = data.bio
        dto.photo_count = +data.photoCount ?? 0
        dto.liked_photo_count = +data.likedPhotoCount ?? 0
        dto.following_count = +data.followingCount ?? 0
        dto.follower_count = +data.followerCount ?? 0

        return dto
    }
}
