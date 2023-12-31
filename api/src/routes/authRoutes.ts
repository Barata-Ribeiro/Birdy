import express from "express";

import { AuthController } from "../controllers/AuthController";

const router = express.Router();

const authController = new AuthController();

router.post("/login", (req, res, next) => {
	authController.login(req, res).catch(next);
});

router.post("/token", (req, res, next) => {
	authController.refreshToken(req, res).catch(next);
});

router.post("/logout", (req, res, next) => {
	authController.logout(req, res).catch(next);
});

router.post("/forgot-password", (req, res, next) => {
	authController.forgotPassword(req, res).catch(next);
});

router.post("/reset-password/:userId/:token", (req, res, next) => {
	authController.resetPassword(req, res).catch(next);
});

export default router;
