export interface UserContextResponse {
    id: string
    username: string
    display_name: string
    email: string
    role: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    createdAt: string
    updatedAt: string
}

export interface PublicProfileResponse {
    id: string
    username: string
    display_name: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    photo_count: number
    liked_photo_count: number
    following_count: number
    follower_count: number
}

export interface PrivateProfileResponse {
    id: string
    username: string
    display_name: string
    email: string
    avatar_url?: string
    cover_image_url?: string
    bio?: string
    photo_count: number
    liked_photo_count: number
    last_liked_photos: any[]
    following_count: number
    follower_count: number
    comment_count: number
    last_comments_made: any[]
}