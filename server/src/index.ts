import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import dataSource from "./database/DataSource";
import userRoutes from "./routes/userRoutes";

if (process.env.DB_TYPE !== "postgres") {
  throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");
}

const startServer = async (): Promise<void> => {
  try {
    await dataSource.initialize();

    const app = express();

    app.use(cors() as unknown as express.RequestHandler);

    app.use(helmet());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many requests, please try again later.",
    });

    app.use(limiter);

    app.use(express.json());

    app.use("/api/v1/users", userRoutes);

    app.use(
      (
        err: Error,
        _req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        _next: express.NextFunction
      ) => {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
      }
    );

    app.get("/", (_req, res) => {
      res.send("Hello, World!");
    });

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
