/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-errors";
import { JwtPayload, LoginRequestBody } from "../@types/birdy";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as LoginRequestBody;

    const existingUserByEmail = await userRepository.findOneBy({ email });

    if (!existingUserByEmail)
      throw new BadRequestError("Password or email is incorrect.");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUserByEmail.password
    );

    if (!isPasswordCorrect)
      throw new BadRequestError("Password or email is incorrect.");

    const accessToken = jwt.sign(
      { id: existingUserByEmail.id },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: existingUserByEmail.id },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      { expiresIn: "7d" }
    );

    const { password: _, ...userLogin } = existingUserByEmail;
    return res.status(200).json({ user: userLogin, accessToken, refreshToken });
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required.");
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET ?? ""
      ) as JwtPayload;
    } catch (err) {
      throw new UnauthorizedError("Invalid refresh token.");
    }

    const user = await userRepository.findOneBy({ id: payload.id });
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "15m" }
    );

    return res.status(200).json({ accessToken });
  }
}
