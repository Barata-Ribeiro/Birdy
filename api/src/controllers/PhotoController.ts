/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { PhotoRequestBody } from "../@types/types";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { PhotoServices } from "../services/PhotoServices";

export class PhotoController {
	async uploadPhoto(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const user = req.user;
			const file = req.file as Express.Multer.File;
			const { title, size, habitat } = req.body as PhotoRequestBody;

			if (!user) throw new UnauthorizedError("User not authenticated.");
			if (!file) throw new BadRequestError("No file provided.");
			if (!title || !size || !habitat)
				throw new BadRequestError(
					"Title, size, and habitat are required fields."
				);

			const result = await PhotoServices.uploadPhoto(user, file, {
				title,
				size,
				habitat,
			});
			return res.status(201).send(result);
		} catch (error) {
			next(error);
		}
	}

	async getAllPhotos(
		req: Request,
		res: Response,
		_next: NextFunction
	): Promise<Response> {
		const page = parseInt(req.query.page as string) || 1;
		const total = parseInt(req.query.limit as string) || 5;
		const userId = req.query.userId as string;

		const photos = await PhotoServices.getAllPhotos(page, total, userId);
		return res.status(200).send(photos);
	}

	async getPhotoById(req: Request, res: Response): Promise<Response> {
		const { photoId } = req.params as { photoId: string };
		const arrayViewedPhotos = req.cookies.viewedPhotos?.photoIds || [];

		const hasViewed = arrayViewedPhotos.includes(photoId);

		const photo = await PhotoServices.getPhotoById(photoId, hasViewed);

		if (!hasViewed) {
			arrayViewedPhotos.push(photoId);
			res.cookie(
				"viewedPhotos",
				{ photoIds: arrayViewedPhotos },
				{
					httpOnly: true,
					secure: true,
					sameSite: "none",
					maxAge: 86400000,
					expires: new Date(Date.now() + 86400000),
				}
			);
		}

		return res.status(200).json(photo);
	}

	async deletePhoto(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const { photoId } = req.params as { photoId: string };
			const user = req.user;

			if (!user) throw new UnauthorizedError("User not authenticated.");

			await PhotoServices.deletePhoto(photoId, user);
			return res.status(200).send({ message: "Photo deleted successfully." });
		} catch (error) {
			next(error);
		}
	}
}
