import express from "express";

import { AuthController } from "../controllers/AuthController";

const router = express.Router();

const authController = new AuthController();

router.get("/login", (req, res, next) => {
  void authController.login(req, res).catch(next);
});

router.post("/refresh-token", (req, res, next) => {
  void authController.refreshToken(req, res).catch(next);
});

export default router;
