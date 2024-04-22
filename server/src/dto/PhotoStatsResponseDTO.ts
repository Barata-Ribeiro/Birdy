import { Photo } from "../entity/Photo"

export class PhotoStatsResponseDTO {
    id: string
    title: string
    total_likes: number
    total_comments: number
    total_views: number
    created_at: Date

    static fromEntity(photo: Photo): PhotoStatsResponseDTO {
        const dto = new PhotoStatsResponseDTO()

        dto.id = photo.id
        dto.title = photo.title
        dto.total_likes = photo.meta.total_likes ?? 0
        dto.total_comments = photo.meta.total_comments ?? 0
        dto.total_views = photo.meta.total_views ?? 0
        dto.created_at = photo.createdAt

        return dto
    }
}
