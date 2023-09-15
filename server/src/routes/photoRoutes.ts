import express from "express";
import multer from "multer";

import { PhotoController } from "../controllers/PhotoController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const photoController = new PhotoController();

router.get("/", (req, res, next) => {
  void photoController.getAllPhotos(req, res, next).catch(next);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.use(authMiddleware);
router.post("/", upload.single("imageFile"), (req, res, next) => {
  void photoController.uploadPhoto(req, res, next).catch(next);
});

export default router;
