import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../helpers/api-errors";

export const authAdminMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	if (req.user && req.user.role === "admin") next();
	else next(new UnauthorizedError("User is not an admin."));
};
