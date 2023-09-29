import { Request, Response } from "express";

import { ProfileServices } from "../services/ProfileServices";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import { validate } from "uuid";

export class ProfileController {
  async getProfile(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    if (!user) throw new UnauthorizedError("User not authenticated.");

    const { id } = user;
    if (!validate(id)) throw new BadRequestError("Invalid user ID.");

    const profile = await ProfileServices.getProfile(id);
    return res.status(200).json(profile);
  }
}
