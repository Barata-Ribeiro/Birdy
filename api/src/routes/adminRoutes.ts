/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { authAdminMiddleware } from "../middlewares/authAdmin";

const router = express.Router();

const userController = new UserController();

router.delete(
	"/:userId",
	authMiddleware,
	authAdminMiddleware,
	(req, res, next) => {
		userController.deleteUserById(req, res).catch(next);
	}
);

export default router;
