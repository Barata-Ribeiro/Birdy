/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { FollowingController } from "../controllers/FollowingController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
const followingControler = new FollowingController();

router.get("/:userId/followings", (req, res, next) => {
	followingControler.getAllUserFollowings(req, res).catch(next);
});

router.post("/:userId/follow", authMiddleware, (req, res, next) => {
	followingControler.followUser(req, res).catch(next);
});

router.delete("/:userId/unfollow", authMiddleware, (req, res, next) => {
	followingControler.unfollowUser(req, res).catch(next);
});

export default router;
