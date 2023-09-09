import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

const userController = new UserController();

router.get("/", (req, res, next) => {
  console.log("Accessing /users route");
  void userController.getAllUsers(req, res).catch(next);
});

router.post("/", (req, res, next) => {
  void userController.createUser(req, res).catch(next);
});

router.get("/:id", (req, res, next) => {
  void userController.getUser(req, res).catch(next);
});

export default router;
