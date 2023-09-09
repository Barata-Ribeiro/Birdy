import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

const userController = new UserController();

router.post("/user", (req, res, next) => {
  void userController.createUser(req, res).catch(next);
});

router.get("/user/:id", (req, res, next) => {
  void userController.getUser(req, res).catch(next);
});

export default router;
