/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { AuthServices } from "../services/AuthServices";
import { LoginRequestBody } from "src/@types/types";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as LoginRequestBody;
    const tokens = await AuthServices.login(email, password);

    res.cookie(
      "jwt",
      { refreshToken: tokens.refreshToken },
      {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      }
    );

    return res.status(200).json(tokens);
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies?.jwt?.refreshToken;
    if (!refreshToken) throw new UnauthorizedError("Missing refresh token.");

    const tokens = await AuthServices.refreshToken(refreshToken);
    return res.status(200).json(tokens);
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies?.jwt?.refreshToken;
      if (!refreshToken) throw new UnauthorizedError("Missing refresh token.");

      await AuthServices.logout(refreshToken);
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) throw new UnauthorizedError(error.message);
      else throw new UnauthorizedError("An error occurred during logout.");
    }
  }
}
