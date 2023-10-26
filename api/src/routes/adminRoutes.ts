/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { AdminController } from "../controllers/AdminController";
import { authMiddleware } from "../middlewares/auth";
import { authAdminMiddleware } from "../middlewares/authAdmin";

const router = express.Router();

const adminController = new AdminController();

router.get("/", authMiddleware, authAdminMiddleware, (req, res, next) => {
	adminController.getUserByUsername(req, res).catch(next);
});

router.delete(
	"/:photoId/comments/:commentId",
	authMiddleware,
	authAdminMiddleware,
	(req, res, next) => {
		adminController.deleteCommentById(req, res, next).catch(next);
	}
);

router.delete(
	"/:photoId",
	authMiddleware,
	authAdminMiddleware,
	(req, res, next) => {
		adminController.deletePhotoById(req, res, next).catch(next);
	}
);

router.delete(
	"/:userId",
	authMiddleware,
	authAdminMiddleware,
	(req, res, next) => {
		adminController.deleteUserById(req, res).catch(next);
	}
);

export default router;
