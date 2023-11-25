import "dotenv/config";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dataSource from "./database/DataSource";
import errorMiddleware from "./middlewares/error";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import photoRoutes from "./routes/photoRoutes";
import profileRoutes from "./routes/profileRoutes";
import userFollowingRoutes from "./routes/userFollowingRoutes";
import userLikesRoutes from "./routes/userLikesRoutes";
import userRoutes from "./routes/userRoutes";

if (dataSource.options.type !== "postgres")
	throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const startServer = async (): Promise<void> => {
	try {
		await dataSource.initialize();

		const app = express();
		app.use(cookieParser());
		app.use(
			compression({
				level: 6,
				threshold: 100 * 1000,
			})
		);

		app.set("trust proxy", 1);

		const corsOptions: cors.CorsOptions = {
			origin: true,
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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
				"X-Api-Version",
				"X-CSRF-Token",
				"X-HTTP-Method-Override",
				"x-openrtb-version",
				"X-Requested-With",
			],
			credentials: true,
			preflightContinue: true,
			maxAge: 600,
		};

		app.options("*", cors(corsOptions));
		app.use(cors(corsOptions));

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
		app.use(express.urlencoded({ extended: true }));

		// ROUTES //
		app.use("/api/v1/auth", limiter, authRoutes);
		app.use("/api/v1/users", limiter, userRoutes);
		app.use("/api/v1/users", limiter, userFollowingRoutes);
		app.use("/api/v1/admin", limiter, adminRoutes);
		app.use("/api/v1/profile", limiter, profileRoutes);
		app.use("/api/v1/photos", limiter, photoRoutes);
		app.use("/api/v1/photos", limiter, userLikesRoutes);
		app.use("/api/v1/photos", limiter, commentRoutes);

		app.use(errorMiddleware);

		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}, enjoy!`);
			if (process.env.NODE_ENV === "production")
				console.log("Server is running in production mode.");
			else console.log(`Server in running in ${process.env.NODE_ENV} mode.`);
		});
	} catch (error) {
		console.error("Error while starting the server:", error);
	}
};

startServer().catch((err) => {
	console.error("Failed to start the server:", err);
});
