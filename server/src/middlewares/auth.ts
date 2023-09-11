/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";
import { JwtPayload } from "../@types/birdy";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) throw new UnauthorizedError("User not authenticated.");

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;

  const user = await userRepository.findOneBy({ id });

  if (!user) throw new UnauthorizedError("User not authenticated.");

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};
