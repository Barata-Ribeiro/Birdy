import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import dataSource from "./database/DataSource";
import errorMiddleware from "./middlewares/error";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import photoRoutes from "./routes/photoRoutes";
import userLikesRoutes from "./routes/userLikesRoutes";
import commentRoutes from "./routes/commentRoutes";
import profileRoutes from "./routes/profileRoutes";

if (dataSource.options.type !== "postgres")
	throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");

const startServer = async (): Promise<void> => {
	try {
		await dataSource.initialize();

		const app = express();

		app.use(
			cors({
				origin: process.env.CORS_ORIGIN,
				credentials: true,
				methods: "GET, POST, PATCH, DELETE",
			}) as unknown as express.RequestHandler
		);

		app.use(helmet());

		const limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100,
			message: "Too many requests, please try again later.",
		});

		app.use(limiter);

		const authLimiter = rateLimit({
			windowMs: 5 * 60 * 1000, // 5 minutes
			max: 10,
			message: "Too many authentication attempts, please try again later.",
		});

		const readLimiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100,
			message: "Too many requests, please try again later.",
		});

		const writeLimiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 50,
			message: "Too many requests, please try again later.",
		});

		app.use(express.json());

		app.use(cookieParser());

		// ROUTES //
		app.use("/api/v1/auth", authLimiter, authRoutes);
		app.use("/api/v1/users", readLimiter, userRoutes);
		app.use("/api/v1/profile", readLimiter, profileRoutes);
		app.use("/api/v1/photos", writeLimiter, photoRoutes);
		app.use("/api/v1/photos", writeLimiter, userLikesRoutes);
		app.use("/api/v1/photos", writeLimiter, commentRoutes);

		app.use(errorMiddleware);

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}/`);
		});
	} catch (error) {
		console.error("Error while starting the server:", error);
	}
};

startServer().catch((err) => {
	console.error("Failed to start the server:", err);
});
