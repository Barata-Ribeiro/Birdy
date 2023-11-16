/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { LoginRequestBody } from "../@types/types";
import { UnauthorizedError } from "../helpers/api-errors";
import { AuthServices } from "../services/AuthServices";

export class AuthController {
	async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body as LoginRequestBody;
		const tokens = await AuthServices.login(email, password);

		res.cookie(
			"jwt",
			{ refreshToken: tokens.refreshToken },
			{
				httpOnly: true,
				secure: true,
        sameSite: "none",
				maxAge: 604800000,
				expires: new Date(Date.now() + 604800000),
			}
		);

		return res.status(200).json(tokens);
	}

	async refreshToken(req: Request, res: Response): Promise<Response> {
		const refreshToken = req.cookies?.jwt?.refreshToken;
		if (!refreshToken) throw new UnauthorizedError("Missing refresh token.");

		const userInfo = await AuthServices.refreshToken(refreshToken);
		return res.status(200).json(userInfo);
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
			res.status(200).json({
				message: "Successfully logged out.",
			});
		} catch (error) {
			if (error instanceof Error) throw new UnauthorizedError(error.message);
			else throw new UnauthorizedError("An error occurred during logout.");
		}
	}

	async forgotPassword(req: Request, res: Response): Promise<Response> {
		const { email } = req.body as LoginRequestBody;

		await AuthServices.forgotPassword(email);
		return res.status(200).send({
			message: "An email has been sent to reset your password.",
		});
	}

	async resetPassword(req: Request, res: Response): Promise<Response> {
		const { userId, token } = req.params as { userId: string; token: string };

		const { password } = req.body as LoginRequestBody;

		await AuthServices.resetPassword(userId, token, password);
		return res.status(200).send({
			message: "Your password has been reset.",
		});
	}
}
