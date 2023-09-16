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
import {
  JwtPayload,
  LoginRequestBody,
  Cookies,
  AuthTokens,
} from "../@types/types";

export class AuthServices {
  static async login(req: Request, res: Response): Promise<AuthTokens> {
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

    existingUserByEmail.refreshToken = refreshToken;
    await userRepository.save(existingUserByEmail);

    res.cookie(
      "jwt",
      { refreshToken: refreshToken },
      {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      }
    );

    return {
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    };
  }

  static async refreshToken(req: Request, _res: Response): Promise<AuthTokens> {
    const cookies: Cookies = req.cookies;
    if (!cookies?.jwt) throw new UnauthorizedError("Missing refresh token.");
    const { refreshToken } = cookies.jwt;

    if (typeof refreshToken !== "string")
      throw new BadRequestError("Refresh token is required.");

    let payload: JwtPayload;
    try {
      payload = <JwtPayload>(
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET ?? "")
      );
    } catch (err) {
      throw new UnauthorizedError("Invalid refresh token.");
    }

    const user = await userRepository.findOneBy({ id: payload.id });
    if (!user) throw new NotFoundError("User not found.");

    if (user.refreshToken !== refreshToken)
      throw new UnauthorizedError("Invalid refresh token.");

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "15m" }
    );

    return { accessToken: accessToken.toString() };
  }

  static async logout(req: Request, _res: Response): Promise<void> {
    const cookies: Cookies = req.cookies;
    if (!cookies?.jwt) throw new UnauthorizedError("Missing refresh token.");
    const { refreshToken } = cookies.jwt;

    const user = await userRepository.findOneBy({ refreshToken });
    if (!user) throw new UnauthorizedError("Invalid refresh token.");

    user.refreshToken = "";
    await userRepository.save(user);
  }
}
