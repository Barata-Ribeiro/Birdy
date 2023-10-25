import { Request, Response } from "express";

import { BadRequestError } from "../helpers/api-errors";
import AdminService from "../services/AdminServices";

export class AdminController {
	async getUserByUsername(req: Request, res: Response): Promise<Response> {
		const { username } = req.params as { username: string };
		const user = await AdminService.getUserByUsername(username);
		return res.status(200).json(user);
	}

	async deleteUserById(req: Request, res: Response): Promise<Response | void> {
		const { userId } = req.params as { userId: string };

		if (typeof req.params.id !== "string")
			throw new BadRequestError("No user ID provided.");

		await AdminService.deleteUserById(userId);
		return res.status(200).send({ message: "User deleted successfully." });
	}
}
