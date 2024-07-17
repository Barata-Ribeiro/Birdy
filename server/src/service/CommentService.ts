import { AppDataSource } from "../database/data-source"
import { CommentResponseDTO } from "../dto/CommentResponseDTO"
import { User } from "../entity/User"
import { BadRequestError, InternalServerError, NotFoundError } from "../middleware/helpers/ApiErrors"
import { commentRepository } from "../repository/CommentRepository"
import { photoRepository } from "../repository/PhotoRepository"
import { userRepository } from "../repository/UserRepository"
import { saveEntityToDatabase } from "../utils/operation-functions"
import { isUUIDValid } from "../utils/validity-functions"

export class CommentService {
    async getComments(photoId: string) {
        if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")

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
        if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")

        if (!content || content.trim() === "") throw new BadRequestError("You cannot add an empty comment.")

        const photo = await photoRepository.findOneBy({
            id: photoId
        })
        if (!photo) throw new NotFoundError("Photo not found.")

        const checkIfAuthorExists = await userRepository.existsBy({
            id: author.id
        })
        if (!checkIfAuthorExists) throw new NotFoundError("User not found.")

        const newComment = commentRepository.create({
            content: content.trim(),
            author: { id: author.id, username: author.username },
            photo: { id: photoId }
        })

        photo.meta.total_comments = (photo.meta.total_comments ?? 0) + 1
        await saveEntityToDatabase(photoRepository, photo)
        const savedNewComment = await saveEntityToDatabase(commentRepository, newComment)

        return CommentResponseDTO.fromEntity(savedNewComment)
    }

    async updateComment(author: Partial<User>, photoId: string, commentId: string, content: string) {
        if (!isUUIDValid(photoId)) throw new BadRequestError("Invalid photo ID.")
        if (!isUUIDValid(commentId)) throw new BadRequestError("Invalid comment ID.")

        if (!content || content.trim() === "") throw new BadRequestError("You cannot update a comment to be empty.")

        const checkIfPhotoExists = await photoRepository.existsBy({
            id: photoId
        })
        if (!checkIfPhotoExists) throw new NotFoundError("Photo not found.")

        const checkIfAuthorExists = await userRepository.existsBy({
            id: author.id
        })
        if (!checkIfAuthorExists) throw new NotFoundError("User not found.")

        const comment = await commentRepository.findOne({
            where: {
                id: commentId,
                author: { id: author.id, username: author.username },
                photo: { id: photoId }
            },
            relations: ["author", "photo"]
        })
        if (!comment) throw new NotFoundError("Comment not found.")

        comment.content = content.trim()
        comment.was_edited = true

        await saveEntityToDatabase(commentRepository, comment)
    }

    async deleteComment(author: Partial<User>, photoId: string, commentId: string) {
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            if (!isUUIDValid(photoId) || !isUUIDValid(commentId))
                throw new BadRequestError("Invalid photo ID or comment ID.")

            const checkIfAuthorExists = await userRepository.existsBy({
                id: author.id
            })
            if (!checkIfAuthorExists) throw new NotFoundError("User not found.")

            const checkIfPhotoExists = await photoRepository.existsBy({
                id: photoId
            })
            if (!checkIfPhotoExists) throw new NotFoundError("Photo not found.")

            const comment = await commentRepository.findOne({
                where: {
                    id: commentId,
                    author: {
                        id: author.id,
                        username: author.username
                    },
                    photo: { id: photoId }
                },
                relations: ["author", "photo"]
            })
            if (!comment) throw new NotFoundError("Comment not found.")

            try {
                await transactionalEntityManager.remove(comment)
            } catch (error) {
                console.error("Transaction failed: ", error)
                throw new InternalServerError("Failed to delete comment.")
            }
        })
    }
}
