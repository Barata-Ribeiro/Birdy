/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer, { SendMailOptions } from "nodemailer";

import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-errors";
import { JwtPayload, AuthTokens } from "../@types/types";
import { Request } from "express";

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

  private static async sendMail(options: SendMailOptions): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.ORIGIN_HOST,
      port: Number(process.env.ORIGIN_PORT),
      auth: {
        user: process.env.ORIGIN_AUTH_USER,
        pass: process.env.ORIGIN_AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ORIGIN_MAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
  }

  static async forgotPassword(email: string, req: Request): Promise<void> {
    const existingUserByEmail = await userRepository.findOneBy({ email });

    if (!existingUserByEmail)
      throw new BadRequestError("This email appears to be incorrect.");

    const secretKey = process.env.JWT_SECRET + existingUserByEmail.password;

    const payload = {
      id: existingUserByEmail.id,
      email: existingUserByEmail.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "15m" });

    const recoverLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${existingUserByEmail.id}/${token}`;

    const emailMessage = `Hello🖖, there, ${existingUserByEmail.username}!\n\n

    We have received a request to reset your password. Please click on the following link to reset your password: ${recoverLink}\n\n

    This link will expire in 15 minutes. If you did not request this, please ignore this email and your password will remain unchanged.\n\n`;

    try {
      await this.sendMail({
        to: existingUserByEmail.email,
        subject: "Birdy - Password Reset",
        text: emailMessage,
      });
    } catch (error) {
      throw new InternalServerError(
        "There was an error sending the email for password reset. Please, try again later."
      );
    }
  }
}
