import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { FollowingServices } from "../services/FollowingServices";

export class FollowingController {
	async followUser(req: Request, res: Response): Promise<Response> {
		const user = req.user;
		if (!user) throw new UnauthorizedError("User not authenticated.");

		const { userId } = req.params as { userId: string };
		if (!userId) throw new BadRequestError("No user ID provided.");

		await FollowingServices.followUser(user, userId);

		return res.status(201).send({ message: "User followed successfully." });
	}

	async unfollowUser(req: Request, res: Response): Promise<Response> {
		const user = req.user;
		if (!user) throw new UnauthorizedError("User not authenticated.");

		const { userId } = req.params as { userId: string };
		if (!userId) throw new BadRequestError("No user ID provided.");

		await FollowingServices.unfollowUser(user, userId);

		return res.status(201).send({ message: "User unfollowed successfully." });
	}

	async getAllUserFollowings(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params as { userId: string };
		if (!userId) throw new BadRequestError("No user ID provided.");

		const page = parseInt(req.query.page as string) || 1;
		const total = parseInt(req.query.limit as string) || 10;

		const followers = await FollowingServices.getAllUserFollowings(
			userId,
			total,
			page
		);

		return res.status(200).json(followers);
	}
}
