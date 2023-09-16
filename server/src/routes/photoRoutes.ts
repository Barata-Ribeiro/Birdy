/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import multer from "multer";

import { PhotoController } from "../controllers/PhotoController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const photoController = new PhotoController();

router.get("/", (req, res, next) => {
  photoController.getAllPhotos(req, res, next).catch(next);
});

router.get("/:id", (req, res, next) => {
  photoController.getPhotoById(req, res).catch(next);
});

router.post(
  "/",
  authMiddleware,
  upload.single("imageFile"),
  (req, res, next) => {
    photoController.uploadPhoto(req, res, next).catch(next);
  }
);

router.delete("/:id", authMiddleware, (req, res, next) => {
  photoController.deletePhoto(req, res, next).catch(next);
});

export default router;
