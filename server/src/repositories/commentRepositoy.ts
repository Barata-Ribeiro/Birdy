import dataSource from "../database/DataSource";
import { Comment } from "../entities/Comment";

export const commentRepository = dataSource.getRepository(Comment);
