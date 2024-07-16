import { PhotoAuthor } from "./users"

export interface PhotoMeta {
    bird_name?: string
    bird_size: number
    bird_habitat: string
    total_comments?: number
    total_views?: number
    total_likes?: number
}

export interface PhotoAuthor {
    id: string
    username: string
    display_name: string
    avatar_url: string
}

export interface PhotoLike {
    id: string
    user_id: string
    photo_id: string
    liked_at: string
}

export interface PhotoComment {
    id: string
    content: string
    author_id: string
    author_username: string
    author_name: string
    photo_id: string
    was_edited: boolean
    created_at: string
    updated_at: string
}

export interface FeedRequestParams {
    perPage?: number
    page?: number
    userId?: string | null
}

export interface FeedResponse {
    id: string
    title: string
    description: string
    image_url: string
    slug: string
    meta: PhotoMeta
    author: PhotoAuthor
    createdAt: string
    updatedAt: string
}

export interface PhotoResponse {
    id: string
    title: string
    description: string
    image_url: string
    slug: string
    meta: PhotoMeta
    author: PhotoAuthor
    likes: PhotoLike[]
    comments: PhotoComment[]
    created_at: string
    updated_at: string
}

export interface ToggleLikeResponse {
    id?: string
    user?: { id: string; username: string }
    photo?: { id: string }
    liked_at?: string
    is_liked: boolean
    total_likes: number
}

export interface PhotoStatsResponse {
    id: string
    title: string
    total_likes: number
    total_comments: number
    total_views: number
    created_at: string
}
