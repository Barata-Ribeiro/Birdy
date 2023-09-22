/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { CommentController } from "../controllers/CommentController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

const commentController = new CommentController();

router.post("/:photoId/comments", authMiddleware, (req, res, next) => {
  commentController.createComment(req, res, next).catch(next);
});

router.get("/:photoId/comments", (req, res, next) => {
  commentController.getAllCommentsForPhoto(req, res, next).catch(next);
});

router.get("/:photoId/comments/:commentId", (req, res, next) => {
  commentController.getCommentById(req, res, next).catch(next);
});

router.delete(
  "/:photoId/comments/:commentId",
  authMiddleware,
  (req, res, next) => {
    commentController.deleteCommentById(req, res, next).catch(next);
  }
);

export default router;
