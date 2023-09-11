/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { UnauthorizedError } from "src/helpers/api-errors";
import { AuthServices } from "src/services/AuthServices";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const tokens = await AuthServices.login(req);
    return res.status(200).json(tokens);
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const tokens = await AuthServices.refreshToken(req, res);
    return res.status(200).json(tokens);
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      await AuthServices.logout(req, res);
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
