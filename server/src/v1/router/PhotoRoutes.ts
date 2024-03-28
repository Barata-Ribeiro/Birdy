import { Router } from "express"
import multer from "multer"
import { PhotoController } from "../../controller/PhotoController"
import authMiddleware from "../../middleware/AuthMiddleware"

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

const photoController = new PhotoController()

router.get("/", (req, res, next) =>
    photoController.getFeedPhotos(req, res).catch(next)
)

router.get("/:photoId", (req, res, next) =>
    photoController.getPhoto(req, res).catch(next)
)

router.post("/", authMiddleware, upload.single("imageFile"), (req, res, next) =>
    photoController.uploadNewPhoto(req, res).catch(next)
)

router.delete("/:photoId", authMiddleware, (req, res, next) =>
    photoController.deletePhoto(req, res).catch(next)
)

export default router
