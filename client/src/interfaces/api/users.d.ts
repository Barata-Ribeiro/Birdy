export interface UserContextResponse {
    id: string
    username: string
    display_name: string
    email: string
    role: "NONE" | "ADMIN" | "MEMBER" | "BANNED"
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
    role: "NONE" | "ADMIN" | "MEMBER" | "BANNED"
    avatar_url: string | null
    cover_image_url: string | null
    bio: string | null
    photo_count: number
    liked_photo_count: number
    following_count: number
    follower_count: number
    created_at: string
}

export interface PrivateProfileResponse {
    id: string
    username: string
    display_name: string
    email: string
    role: "NONE" | "ADMIN" | "MEMBER" | "BANNED"
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
