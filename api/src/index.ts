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

		app.set("trust proxy", 1);

		app.use(function (_req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Credentials", "true");
			res.header(
				"Allow-Control-Allow-Methods",
				"GET,OPTIONS,PATCH,DELETE,POST,PUT"
			);
			res.header(
				"Allow-Control-Allow-Headers",
				"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
			);

			res.header("X-Frame-Options", "DENY");

			app.use(
				cors({
					origin: process.env.CORS_ORIGIN?.split(","),
					methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
					allowedHeaders: [
						"Accept",
						"Accept-Version",
						"Authorization",
						"Cache-Control",
						"Content-Length",
						"Content-Type",
						"Date",
						"DNT",
						"Origin",
						"Range",
						"User-Agent",
						" X-Api-Version",
						"X-CSRF-Token",
						"X-Requested-With",
						"x-openrtb-version",
					],
					exposedHeaders: ["Content-Length", "Content-Range"],
					credentials: true,
					preflightContinue: true,
					optionsSuccessStatus: 201,
				})
			);

			next();
		});

		app.use(
			helmet({
				crossOriginResourcePolicy: false,
			})
		);
		app.use(helmet.noSniff());
		app.use(helmet.xssFilter());
		app.use(helmet.ieNoOpen());
		app.disable("x-powered-by");

		const limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 1000,
			message: "Too many requests, please try again later.",
		});

		app.use(limiter);

		app.use(express.json());

		app.use(cookieParser());

		// ROUTES //
		app.use("/api/v1/auth", limiter, authRoutes);
		app.use("/api/v1/users", limiter, userRoutes);
		app.use("/api/v1/admin", limiter, adminRoutes);
		app.use("/api/v1/profile", limiter, profileRoutes);
		app.use("/api/v1/photos", limiter, photoRoutes);
		app.use("/api/v1/photos", limiter, userLikesRoutes);
		app.use("/api/v1/photos", limiter, commentRoutes);

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
