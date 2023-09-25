import dataSource from "../database/DataSource";
import { UserLikes } from "../entities/UserLikes";

export const userLikeRepository = dataSource.getRepository(UserLikes);
