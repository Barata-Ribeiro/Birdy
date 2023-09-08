import express from "express";
import { createUser } from "../controllers/UserController";

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/user", createUser);
// router.get("/user/:id", getUser);

export default router;
