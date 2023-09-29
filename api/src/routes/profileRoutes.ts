import express from "express";

import { ProfileController } from "../controllers/ProfileController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

const profileController = new ProfileController();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/", authMiddleware, (req, res, next) => {
  profileController.getProfile(req, res).catch(next);
});

export default router;
