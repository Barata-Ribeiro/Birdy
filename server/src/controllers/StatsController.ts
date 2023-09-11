import { Request, Response } from "express";
import { StatsServices } from "../services/StatsServices";

export class StatsController {
  async getStats(req: Request, res: Response): Promise<Response> {
    const stats = await StatsServices.getStats(req);
    return res.json(stats);
  }
}
