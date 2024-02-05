import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Database Import
import dataSource from "./database/DataSource";

// Middleware Imports
import errorMiddleware from "./middlewares/error";

// Route Imports
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import photoRoutes from "./routes/photoRoutes";
import profileRoutes from "./routes/profileRoutes";
import userFollowingRoutes from "./routes/userFollowingRoutes";
import userLikesRoutes from "./routes/userLikesRoutes";
import userRoutes from "./routes/userRoutes";

// Database Type Check
if (dataSource.options.type !== "postgres") {
	throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");
}

// Default Environment Configuration
process.env.NODE_ENV = process.env.NODE_ENV || "production";

/**
 * Server Startup Function
 */
const startServer = async (): Promise<void> => {
	try {
		// Database Initialization
		await dataSource.initialize();

		// Express App Initialization
		const app = express();

		// Middleware Configuration
		app.use(cookieParser());
		app.use(compression({ level: 6, threshold: 100 * 1000 }));
		app.set("trust proxy", 1);

		// CORS Configuration
		const corsOptions: cors.CorsOptions = {
			origin: "*",
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

		// Security Middleware
		app.use(helmet({ crossOriginResourcePolicy: false }));
		app.use(helmet.noSniff());
		app.use(helmet.xssFilter());
		app.use(helmet.ieNoOpen());
		app.disable("x-powered-by");

		// Rate Limiting
		const limiter = rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 1000,
			message: "Too many requests, please try again later.",
		});
		app.use(limiter);

		// Body Parsing Middleware
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

		// Error Handling Middleware
		app.use(errorMiddleware);

		// Server Configuration
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

// Start the Server
startServer().catch((err) => {
	console.error("Failed to start the server:", err);
});
