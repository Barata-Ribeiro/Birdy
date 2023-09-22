import dataSource from "../database/DataSource";
import { User } from "../entities/User";

export const userRepository = dataSource.getRepository(User);
