import { AppDataSource } from "../database/data-source"
import { Photo } from "../entity/Photo"

export const photoRepository = AppDataSource.getRepository(Photo)
