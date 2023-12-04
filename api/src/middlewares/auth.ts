/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JwtPayload } from "../@types/types";
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";

export const authMiddleware = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { authorization } = req.headers;
		if (!authorization)
			throw new BadRequestError("No authentication token provided.");

		const secretKey = process.env.JWT_SECRET!;
		if (!secretKey) throw new NotFoundError("Secret key not found");

		const token = authorization.split(" ")[1];
		let id: string;

		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET ?? ""
			) as JwtPayload;
			id = decoded.id;
		} catch (error) {
			if (error instanceof jwt.JsonWebTokenError)
				return next(new UnauthorizedError("Invalid or expired token."));

			return next(error);
		}

		const user = await userRepository.findOneBy({ id });
		if (!user) throw new NotFoundError("User not found.");

		const { password: _, ...loggedUser } = user;
		req.user = {
			...loggedUser,
			role: user.role,
		};

		next();
	} catch (error) {
		next(error);
	}
};
