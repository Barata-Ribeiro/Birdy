/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

const userController = new UserController();

router.get("/", (req, res, next) => {
	userController.getAllUsers(req, res).catch(next);
});

router.post("/", (req, res, next) => {
	userController.createUser(req, res).catch(next);
});

router.get("/:userId", (req, res, next) => {
	userController.getUserById(req, res).catch(next);
});

router.patch("/", authMiddleware, (req, res, next) => {
	userController.editUserProfile(req, res).catch(next);
});

router.put("/update-userdata", authMiddleware, (req, res, next) => {
	userController.updatedUserdata(req, res).catch(next);
});

router.delete("/delete-account", authMiddleware, (req, res, next) => {
	userController.deleteOwnAccount(req, res).catch(next);
});

export default router;
