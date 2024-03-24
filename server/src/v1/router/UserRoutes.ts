import { Router } from "express"
import { UserController } from "../../controller/UserController"
import authMiddleware from "../../middleware/AuthMiddleware"

const routes = Router()
const userController = new UserController()

routes.get("/", (req, res, next) =>
    userController.getAllUsers(req, res).catch(next)
)

routes.get("/profile/:username", (req, res, next) =>
    userController.getUserProfile(req, res).catch(next)
)

routes.get("/me/:userId", authMiddleware, (req, res, next) =>
    userController.getPrivateProfile(req, res).catch(next)
)

routes.put("/me/:userId", authMiddleware, (req, res, next) =>
    userController.updatePrivateProfile(req, res).catch(next)
)

routes.delete("/me/:userId", authMiddleware, (req, res, next) =>
    userController.deletePrivateProfile(req, res).catch(next)
)

export default routes
