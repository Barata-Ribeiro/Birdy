import dataSource from "../database/DataSource";
import { Photo } from "../entities/Photo";

export const photoRepository = dataSource.getRepository(Photo);
