import express from "express";

import { PhotoController } from "../controllers/PhotoController";

const router = express.Router();

const photoController = new PhotoController();

router.get("/", (req, res, next) => {
  void photoController.getAllPhotos(req, res, next).catch(next);
});

router.post("/", (req, res, next) => {
  void photoController.uploadPhoto(req, res, next).catch(next);
});

export default router;
