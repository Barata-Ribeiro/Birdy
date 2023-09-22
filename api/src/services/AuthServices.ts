/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-errors";
import { JwtPayload, AuthTokens } from "../@types/types";

export class AuthServices {
  static async login(email: string, password: string): Promise<AuthTokens> {
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

    return {
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    };
  }

  static async refreshToken(
    refreshTokenFromCookie: string
  ): Promise<AuthTokens> {
    if (typeof refreshTokenFromCookie !== "string")
      throw new BadRequestError("Refresh token is required.");

    let payload: JwtPayload;
    try {
      payload = <JwtPayload>(
        jwt.verify(
          refreshTokenFromCookie,
          process.env.REFRESH_TOKEN_SECRET ?? ""
        )
      );
    } catch (err) {
      throw new UnauthorizedError("Invalid refresh token.");
    }

    const user = await userRepository.findOneBy({ id: payload.id });
    if (!user) throw new NotFoundError("User not found.");

    if (user.refreshToken !== refreshTokenFromCookie)
      throw new UnauthorizedError("Invalid refresh token.");

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "15m" }
    );

    return { accessToken: accessToken.toString() };
  }

  static async logout(refreshTokenFromCookie: string): Promise<void> {
    const user = await userRepository.findOneBy({
      refreshToken: refreshTokenFromCookie,
    });
    if (!user) throw new UnauthorizedError("Invalid refresh token.");

    user.refreshToken = "";
    await userRepository.save(user);
  }
}
