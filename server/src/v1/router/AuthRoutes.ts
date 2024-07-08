import { Router } from "express"
import AuthController from "../../controller/AuthController"

const routes = Router()
const authController = new AuthController()

routes.post("/register", (req, res, next) => authController.register(req, res).catch(next))

routes.post("/login", (req, res, next) => authController.login(req, res).catch(next))

routes.post("/forgot-password", (req, res, next) => authController.forgotPassword(req, res).catch(next))

routes.put("/reset-password/:userId/:token", (req, res, next) => authController.resetPassword(req, res).catch(next))

export default routes
