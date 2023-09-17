import { Request, Response } from "express";
import { StatsServices } from "../services/StatsServices";

export class StatsController {
  async getStats(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    const stats = await StatsServices.getStats(user);
    return res.json(stats);
  }
}
