import express from "express";
import { StatsController } from "../controllers/StatsController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

const statsController = new StatsController();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.use(authMiddleware);
router.get("/", (req, res, next) => {
  void statsController.getStats(req, res).catch(next);
});

export default router;
