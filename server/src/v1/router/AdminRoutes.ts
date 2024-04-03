import { Router } from "express"
import { AdminController } from "../../controller/AdminController"
import authMiddleware from "../../middleware/AuthMiddleware"

const routes = Router()
const adminController = new AdminController()

routes.get("/:username", authMiddleware, (req, res, next) =>
    adminController.getUserInfo(req, res).catch(next)
)

routes.put("/:username", authMiddleware, (req, res, next) =>
    adminController.updateUserInfo(req, res).catch(next)
)

routes.put("/:username/role", authMiddleware, (req, res, next) =>
    adminController.updateUserRole(req, res).catch(next)
)

routes.put("/:username/ban", authMiddleware, (req, res, next) =>
    adminController.banUser(req, res).catch(next)
)

routes.delete("/:username", authMiddleware, (req, res, next) =>
    adminController.deleteUser(req, res).catch(next)
)

export default routes
