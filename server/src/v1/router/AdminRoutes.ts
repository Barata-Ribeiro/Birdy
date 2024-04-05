import { Router } from "express"
import { AdminController } from "../../controller/AdminController"
import authMiddleware from "../../middleware/AuthMiddleware"

const routes = Router()
const adminController = new AdminController()

// User related routes
routes.get("/users/:username", authMiddleware, (req, res, next) =>
    adminController.getUserInfo(req, res).catch(next)
)

routes.put("/users/:username", authMiddleware, (req, res, next) =>
    adminController.updateUserInfo(req, res).catch(next)
)

routes.put("/users/:username/role", authMiddleware, (req, res, next) =>
    adminController.updateUserRole(req, res).catch(next)
)

routes.put("/users/:username/ban", authMiddleware, (req, res, next) =>
    adminController.banUser(req, res).catch(next)
)

routes.delete("/users/:username", authMiddleware, (req, res, next) =>
    adminController.deleteUser(req, res).catch(next)
)

// Photo related routes
routes.delete("/photos/:photoId", authMiddleware, (req, res, next) =>
    adminController.deletePhoto(req, res).catch(next)
)

// Ccomment related routes
routes.put(
    "/photos/:photoId/comments/:commentId",
    authMiddleware,
    (req, res, next) => adminController.updateComment(req, res).catch(next)
)

routes.delete(
    "/photos/:photoId/comments/:commentId",
    authMiddleware,
    (req, res, next) => adminController.deleteComment(req, res).catch(next)
)

export default routes
