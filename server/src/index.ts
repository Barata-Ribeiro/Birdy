import "dotenv/config";
import express from "express";
import { DataSource } from "typeorm/data-source/DataSource";
import userRoutes from "./routes/user";
import ormconfig from "./database/ormconfig";

if (process.env.DB_TYPE !== "postgres") {
  throw new Error("Invalid DB_TYPE: Only 'postgres' is supported.");
}

const dataBase = new DataSource(ormconfig);

dataBase
  .initialize()
  .then(() => {
    const app = express();

    // Middleware setup
    app.use(express.json());

    // Use routes
    app.use("/user", userRoutes);

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000/");
    });
  })
  .catch((error) => console.log(error));
