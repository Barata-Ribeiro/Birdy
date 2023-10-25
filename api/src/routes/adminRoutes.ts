/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { AdminController } from "src/controllers/AdminController";
import { authMiddleware } from "../middlewares/auth";
import { authAdminMiddleware } from "../middlewares/authAdmin";

const router = express.Router();

const adminController = new AdminController();

router.get("/", authMiddleware, authAdminMiddleware, (req, res, next) => {
	adminController.getUserByUsername(req, res).catch(next);
});

router.delete(
	"/:userId",
	authMiddleware,
	authAdminMiddleware,
	(req, res, next) => {
		adminController.deleteUserById(req, res).catch(next);
	}
);

export default router;