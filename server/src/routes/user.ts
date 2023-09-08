import express from "express";
import { createUser, getUser } from "../controllers/UserController";

const router = express.Router();

router.post("/user", createUser);
router.get("/user/:id", getUser);

export default router;
