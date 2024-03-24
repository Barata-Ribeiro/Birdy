import { PrivateProfileResponseDTO } from "../dto/PrivateProfileResponseDTO"
import { PublicProfileResponseDTO } from "../dto/PublicProfileResponseDTO"
import { Comment } from "../entity/Comment"
import { Photo } from "../entity/Photo"
import { UserFollow } from "../entity/UserFollow"
import { UserLike } from "../entity/UserLike"
import { BadRequestError } from "../middleware/helpers/ApiErrors"
import { userRepository } from "../repository/UserRepository"

export class UserService {
    async getUserProfile(username: string) {
        const user = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id",
                "user.username",
                "user.display_name",
                "user.avatar_url",
                "user.cover_image_url",
                "user.bio"
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(photo.id)", "photoCount")
                    .from(Photo, "photo")
                    .where("photo.authorId = user.id")
            }, "photoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userLike.photoId)",
                        "likedPhotoCount"
                    )
                    .from(UserLike, "userLike")
                    .where("userLike.userId = user.id")
            }, "likedPhotoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userFollow.followingId)",
                        "followingCount"
                    )
                    .from(UserFollow, "userFollow")
                    .where("userFollow.followerId = user.id")
            }, "followingCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userFollow.followerId)",
                        "followerCount"
                    )
                    .from(UserFollow, "userFollow")
                    .where("userFollow.followingId = user.id")
            }, "followerCount")
            .where("user.username = :username", { username })
            .getRawOne()

        if (!user) throw new BadRequestError("User not found.")

        return PublicProfileResponseDTO.fromRaw(user)
    }

    async getPrivateProfile(userId: string) {
        const user = await userRepository
            .createQueryBuilder("user")
            .select([
                "user.id",
                "user.username",
                "user.display_name",
                "user.email",
                "user.avatar_url",
                "user.cover_image_url",
                "user.bio"
            ])
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(photo.id)", "photoCount")
                    .from(Photo, "photo")
                    .where("photo.authorId = user.id")
            }, "photoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select(
                        "COUNT(DISTINCT userLike.photoId)",
                        "likedPhotoCount"
                    )
                    .from(UserLike, "userLike")
                    .where("userLike.userId = user.id")
            }, "likedPhotoCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select([
                        "photo.id",
                        "photo.title",
                        "photo.slug",
                        "photo.image_url"
                    ])
                    .from(Photo, "photo")
                    .innerJoin(UserLike, "like", "userLike.photoId = photo.id")
                    .where("like.userId = user.id")
                    .orderBy("like.liked_at", "DESC")
                    .limit(2)
            }, "lastLikedPhotos")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT follower.id)", "followerCount")
                    .from(UserFollow, "follower")
                    .where("follower.followingId = user.id")
            }, "followerCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(DISTINCT following.id)", "followingCount")
                    .from(UserFollow, "following")
                    .where("following.followerId = user.id")
            }, "followingCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select("COUNT(comment.id)", "commentCount")
                    .from(Comment, "comment")
                    .where("comment.authorId = user.id")
            }, "commentCount")
            .addSelect((subQuery) => {
                return subQuery
                    .select([
                        "comment.id",
                        "comment.content",
                        "comment.createdAt"
                    ])
                    .from(Comment, "comment")
                    .where("comment.authorId = user.id")
                    .orderBy("comment.createdAt", "DESC")
                    .limit(2)
            }, "lastComments")
            .where("user.id = :userId", { userId })
            .getRawOne()

        if (!user) throw new BadRequestError("User not found.")

        return PrivateProfileResponseDTO.fromRaw(user)
    }
}
