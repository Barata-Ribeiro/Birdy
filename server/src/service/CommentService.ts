import { User } from "../entity/User"
import { BadRequestError, NotFoundError } from "../middleware/helpers/ApiErrors"
import { commentRepository } from "../repository/CommentRepository"
import { photoRepository } from "../repository/PhotoRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
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

    async addComment(author: Partial<User>, photoId: string, content: string) {
        if (!isUUIDValid(String(author.id)) || !isUUIDValid(photoId))
            throw new BadRequestError("Invalid author ID or photo ID.")

        if (!content || content.trim() === "")
            throw new BadRequestError("You cannot add an empty comment.")

        const checkIfPhotoExists = await photoRepository.existsBy({
            id: photoId
        })
        if (!checkIfPhotoExists) throw new NotFoundError("Photo not found.")

        const checkIfAuthorExists = await commentRepository.existsBy({
            id: author.id
        })
        if (!checkIfAuthorExists) throw new NotFoundError("User not found.")

        const newComment = commentRepository.create({
            content: content.trim(),
            author: { id: author.id, username: author.username },
            photo: { id: photoId }
        })

        await saveEntityToDatabase(commentRepository, newComment)
    }

    async updateComment(
        author: Partial<User>,
        photoId: string,
        commentId: string,
        content: string
    ) {
        if (!isUUIDValid(String(author.id)) || !isUUIDValid(photoId))
            throw new BadRequestError("Invalid author ID or photo ID.")
        if (!isUUIDValid(commentId))
            throw new BadRequestError("Invalid comment ID.")

        if (!content || content.trim() === "")
            throw new BadRequestError(
                "You cannot update a comment to be empty."
            )

        const checkIfPhotoExists = await photoRepository.existsBy({
            id: photoId
        })
        if (!checkIfPhotoExists) throw new NotFoundError("Photo not found.")

        const checkIfAuthorExists = await commentRepository.existsBy({
            id: author.id
        })
        if (!checkIfAuthorExists) throw new NotFoundError("User not found.")

        const comment = await commentRepository.findOne({
            where: {
                id: commentId,
                author: { id: author.id },
                photo: { id: photoId }
            }
        })
        if (!comment) throw new NotFoundError("Comment not found.")

        comment.content = content.trim()
        comment.was_edited = true

        await saveEntityToDatabase(commentRepository, comment)
    }
}
