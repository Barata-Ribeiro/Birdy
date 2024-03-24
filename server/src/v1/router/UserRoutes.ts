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

routes.get("/me/:userId", authMiddleware, (req, res, next) => {})

routes.put("/:userId", authMiddleware, (req, res, next) => {})

routes.delete("/:userId", authMiddleware, (req, res, next) => {})

export default routes
