/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { UserController } from "../controllers/UserController";
import { authMiddleware } from "src/middlewares/auth";

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

export default router;
