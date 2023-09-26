/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { LikesController } from "../controllers/LikesController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

const likesController = new LikesController();

router.post("/:photoId/like", authMiddleware, (req, res, next) => {
  likesController.toggleLike(req, res, next).catch(next);
});

export default router;
