import { validate } from "uuid";

import dataSource from "../database/DataSource";
import { User } from "../entities/User";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "../helpers/api-errors";
import { PhotoServices } from "./PhotoServices";

class AdminService {
	static async deleteUserById(userId: string): Promise<void> {
		if (!validate(userId)) throw new BadRequestError("Invalid user ID.");

		await dataSource.manager.transaction(async (transactionalEntityManager) => {
			try {
				const actualUser = await transactionalEntityManager.findOne(User, {
					where: { id: userId },
				});
				if (!actualUser) throw new NotFoundError("User not found.");

				await PhotoServices.deleteAllPhotos(
					transactionalEntityManager,
					actualUser.id
				);

				await transactionalEntityManager.remove(actualUser);
			} catch (error) {
				console.error("Transaction failed:", error);
				throw new InternalServerError(
					"An error occurred during the deletion process."
				);
			}
		});
	}
}

export default AdminService;
