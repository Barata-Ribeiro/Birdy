import express from "express";
import { StatsController } from "../controllers/StatsController";

const router = express.Router();

const statsController = new StatsController();

router.get("/", (req, res, next) => {
  void statsController.getStats(req, res).catch(next);
});

export default router;
