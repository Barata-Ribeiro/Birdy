import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { commentRepository } from "../repository/CommentRepository"
import { isUUIDValid } from "../utils/validity-functions"

export class CommentService {
    async getComments(photoId: string) {
        if (!isUUIDValid(photoId))
            throw new BadRequestError("Invalid photo ID.")

        const [comments, total] = await commentRepository
            .createQueryBuilder("comment")
            .leftJoinAndSelect("comment.author", "author")
            .select([
                "comment.id",
                "comment.content",
                "comment.was_edited",
                "comment.createdAt",
                "comment.updatedAt",
                "author.id",
                "author.username",
                "author.display_name",
                "author.avatar_url"
            ])
            .where("comment.photoId = :photoId", { photoId })
            .orderBy("comment.createdAt", "DESC")
            .getManyAndCount()

        return { comments, total }
    }
}
