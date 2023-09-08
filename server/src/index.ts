import "dotenv/config";
import express from "express";
import dataSource from "./database/DataSource";
import userRoutes from "./routes/user";

if (process.env.DB_TYPE !== "postgres") {
  throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");
}

const startServer = async (): Promise<void> => {
  try {
    await dataSource.initialize();

    const app = express();
    app.use(express.json());
    app.use("/api/v1/users", userRoutes);

    app.use((err: Error, _req: express.Request, res: express.Response) => {
      console.error(err.stack);
      res.status(500).send("Something went wrong!");
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
