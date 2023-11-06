import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import dataSource from "./database/DataSource";
import errorMiddleware from "./middlewares/error";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import photoRoutes from "./routes/photoRoutes";
import profileRoutes from "./routes/profileRoutes";
import userLikesRoutes from "./routes/userLikesRoutes";
import userRoutes from "./routes/userRoutes";

if (dataSource.options.type !== "postgres")
	throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");

const startServer = async (): Promise<void> => {
	try {
		await dataSource.initialize();

		const app = express();

		app.set("trust proxy", true);

		app.use(
			cors({
				origin: [
					"http://localhost:3000",
					`${process.env.CORS_ORIGIN}`,
					`${process.env.FRONTEND_ORIGIN}`,
				],
				methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
				allowedHeaders: [
					"Content-Type",
					"Authorization",
					"Accept",
					"X-Requested-With",
				],
				credentials: true,
				optionsSuccessStatus: 204,
			})
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
		app.use("/api/v1/admin", readLimiter, adminRoutes);
		app.use("/api/v1/profile", readLimiter, profileRoutes);
		app.use("/api/v1/photos", writeLimiter, photoRoutes);
		app.use("/api/v1/photos", writeLimiter, userLikesRoutes);
		app.use("/api/v1/photos", writeLimiter, commentRoutes);

		app.use("*", (_req, res) => {
			res.json({ msg: "no route handler found" }).end();
		});

		app.use(errorMiddleware);

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}, enjoy!`);
		});
	} catch (error) {
		console.error("Error while starting the server:", error);
	}
};

startServer().catch((err) => {
	console.error("Failed to start the server:", err);
});
