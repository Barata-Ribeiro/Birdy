/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import { JwtPayload } from "../@types/types";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedError("User not authenticated.");

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
        return next(
          new UnauthorizedError("You have provided an invalid token.")
        );

      return next(error);
    }

    const user = await userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedError("User not authenticated.");

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser;

    next();
  } catch (error) {
    next(error);
  }
};
