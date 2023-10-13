/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { authAdminMiddleware } from "../middlewares/authAdmin";

const router = express.Router();

const userController = new UserController();

router.get("/", (req, res, next) => {
	userController.getAllUsers(req, res).catch(next);
});

router.post("/", (req, res, next) => {
	userController.createUser(req, res).catch(next);
});

router.get("/:id", (req, res, next) => {
	userController.getUserById(req, res).catch(next);
});

router.patch("/", authMiddleware, (req, res, next) => {
	userController.editUserProfile(req, res).catch(next);
});

router.delete(
	"/:id",
	authMiddleware,
	authAdminMiddleware,
	(req, res, next) => {
		userController.deleteUserById(req, res).catch(next);
	}
);

export default router;
