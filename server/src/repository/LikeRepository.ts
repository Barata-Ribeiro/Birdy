import { AppDataSource } from "../database/data-source"
import { UserLike } from "../entity/UserLike"

export const likeRepository = AppDataSource.getRepository(UserLike)
