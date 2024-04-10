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
    createdAt: Date
    updatedAt: Date
}
