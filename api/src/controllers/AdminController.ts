import { NextFunction, Request, Response } from "express";

import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import AdminService from "../services/AdminServices";

export class AdminController {
	private verifyUserAuth(req: Request): void {
		const user = req.user;
		if (!user) throw new UnauthorizedError("User not authenticated.");
	}
	async getUserByUsername(req: Request, res: Response): Promise<Response> {
		this.verifyUserAuth(req);
		const { username } = req.params as { username: string };
		const userToGet = await AdminService.getUserByUsername(username);
		return res.status(200).json(userToGet);
	}

	async deleteCommentById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			this.verifyUserAuth(req);

			if (typeof req.params.photoId !== "string")
				throw new BadRequestError("No photo ID provided.");

			const photoId = req.params.photoId;

			if (typeof req.params.commentId !== "string")
				throw new BadRequestError("No comment ID provided.");

			const commentId = req.params.commentId;

			await AdminService.deleteCommentById(photoId, commentId);
			return res.status(200).send({ message: "Comment deleted successfully." });
		} catch (error) {
			next(error);
		}
	}

	async deleteUserById(req: Request, res: Response): Promise<Response | void> {
		this.verifyUserAuth(req);

		const { userId } = req.params as { userId: string };

		if (typeof req.params.id !== "string")
			throw new BadRequestError("No user ID provided.");

		await AdminService.deleteUserById(userId);
		return res.status(200).send({ message: "User deleted successfully." });
	}
}
