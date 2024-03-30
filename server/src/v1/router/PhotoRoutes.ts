import { Router } from "express"
import multer from "multer"
import { CommentController } from "../../controller/CommentController"
import { PhotoController } from "../../controller/PhotoController"
import authMiddleware from "../../middleware/AuthMiddleware"

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

const photoController = new PhotoController()
const commentController = new CommentController()

router.get("/", (req, res, next) =>
    photoController.getFeedPhotos(req, res).catch(next)
)

router.get("/:photoId", (req, res, next) =>
    photoController.getPhoto(req, res).catch(next)
)

router.get("/:photoId/comments", (req, res, next) =>
    commentController.getComments(req, res).catch(next)
)

router.post("/", authMiddleware, upload.single("imageFile"), (req, res, next) =>
    photoController.uploadNewPhoto(req, res).catch(next)
)

router.post("/:photoId/comments", authMiddleware, (req, res, next) =>
    commentController.addComment(req, res).catch(next)
)

router.put("/:photoId/comments/:commentId", authMiddleware, (req, res, next) =>
    commentController.updateComment(req, res).catch(next)
)

router.delete(
    "/:photoId/comments/:commentId",
    authMiddleware,
    (req, res, next) => commentController.deleteComment(req, res).catch(next)
)

router.delete("/:photoId", authMiddleware, (req, res, next) =>
    photoController.deletePhoto(req, res).catch(next)
)

export default router
