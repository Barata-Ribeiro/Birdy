import { Router } from "express"
import FollowsController from "../../controller/FollowsController"
import UserController from "../../controller/UserController"
import authMiddleware from "../../middleware/AuthMiddleware"

const routes = Router()
const userController = new UserController()
const followsController = new FollowsController()

routes.get("/", (req, res, next) =>
    userController.getAllUsers(req, res).catch(next)
)

routes.get("/profile/:username", (req, res, next) =>
    userController.getUserProfile(req, res).catch(next)
)

routes.get("/profile/:username/follows", (req, res, next) =>
    followsController.getAllUserFollows(req, res).catch(next)
)

routes.get("/profile/:username/followed-by", (req, res, next) =>
    followsController.checkIfUserIsFollowed(req, res).catch(next)
)

routes.get("/me/context", authMiddleware, (req, res, next) =>
    userController.getUserContext(req, res).catch(next)
)

routes.get("/me/:userId", authMiddleware, (req, res, next) =>
    userController.getPrivateProfile(req, res).catch(next)
)

routes.post("/me/:userId/follow", authMiddleware, (req, res, next) =>
    followsController.followUser(req, res).catch(next)
)

routes.put("/me/:userId", authMiddleware, (req, res, next) =>
    userController.updatePrivateProfile(req, res).catch(next)
)

routes.delete("/me/:userId/unfollow", authMiddleware, (req, res, next) =>
    followsController.unfollowUser(req, res).catch(next)
)

routes.delete("/me/:userId", authMiddleware, (req, res, next) =>
    userController.deletePrivateProfile(req, res).catch(next)
)

export default routes
