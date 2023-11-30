import dataSource from "../database/DataSource";
import { UserFollow } from "../entities/UserFollow";

export const followsRepository = dataSource.getRepository(UserFollow);
