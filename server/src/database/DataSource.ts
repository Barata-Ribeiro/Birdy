import path from "path";
import { DataSource } from "typeorm";
import { __TEST__ } from "../constants";

const dataSource = new DataSource({
  name: "default",
  type: "postgres" as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || ":memory:",
  logging: true,
  synchronize: true,
  migrationsRun: true,
  dropSchema: __TEST__,
  entities: [
    path.join(__dirname, "..", "entity", "**", "*.{ts,js}"),
    path.join(__dirname, "..", "entity", "*.{ts,js}"),
  ],
  migrations: [
    path.join(__dirname, "..", "database", "migrations", "*.{ts,js}"),
  ],
});

export default dataSource;
