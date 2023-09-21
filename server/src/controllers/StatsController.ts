import { Request, Response } from "express";

import { StatsServices } from "../services/StatsServices";
import { UnauthorizedError } from "../helpers/api-errors";

export class StatsController {
  async getStats(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    if (!user) throw new UnauthorizedError("User not authenticated.");

    const stats = await StatsServices.getStats(user);
    return res.status(201).json(stats);
  }
}
