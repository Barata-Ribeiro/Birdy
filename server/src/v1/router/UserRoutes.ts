import { Router } from "express"
import authMiddleware from "../../middleware/AuthMiddleware"

const routes = Router()

routes.get("/", (req, res, next) => {})

routes.get("/:userId", authMiddleware, (req, res, next) => {})

routes.put("/:userId", authMiddleware, (req, res, next) => {})

routes.delete("/:userId", authMiddleware, (req, res, next) => {})

export default routes
