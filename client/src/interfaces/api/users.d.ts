export interface UserContextResponse {
    id: string
    username: string
    display_name: string
    email: string
    role: "0" | "1" | "2" | "3"
    avatar_url: string | null
    cover_image_url: string | null
    bio: string | null
    createdAt: string
    updatedAt: string
}

export interface PublicProfileResponse {
    id: string
    username: string
    display_name: string
    role: "0" | "1" | "2" | "3"
    avatar_url: string | null
    cover_image_url: string | null
    bio: string | null
    created_at: string
    photo_count: number
    liked_photo_count: number
    following_count: number
    follower_count: number
    comment_count: number
}

export interface PrivateProfileResponse {
    id: string
    username: string
    display_name: string
    email: string
    role: "0" | "1" | "2" | "3"
    avatar_url: string | null
    cover_image_url: string | null
    bio: string | null
    photo_count: number
    liked_photo_count: number
    last_liked_photos: any[] // TODO: Implement interface
    following_count: number
    follower_count: number
    comment_count: number
    last_comments_made: any[] // TODO: Implement interface
}

export interface UserPhotosStatsResponse {
    total_photos: number
    latest_photos: {
        total: number
        photos: PhotoStatsResponse[]
    }
    popular_photos: {
        total: number
        photos: PhotoStatsResponse[]
    }
}
