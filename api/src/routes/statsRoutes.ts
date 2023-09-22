import express from "express";

import { StatsController } from "../controllers/StatsController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

const statsController = new StatsController();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", authMiddleware, (req, res, next) => {
  statsController.getStats(req, res).catch(next);
});

export default router;
