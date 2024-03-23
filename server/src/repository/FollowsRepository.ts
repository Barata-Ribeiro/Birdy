import { AppDataSource } from "../database/data-source"
import { UserFollow } from "../entity/UserFollow"

export const followsRepository = AppDataSource.getRepository(UserFollow)
