import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from "typeorm-extension"
import path = require("path")

const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "postgres",
    url:
        process.env.POSTGRES_URI ||
        "postgres://postgres:xxxxxxxx@xxxxxxxxx:5432/test",
    database: process.env.POSTGRES_DB || "test",
    synchronize: true,
    logging: true,
    migrationsRun: true,
    ssl: true,
    extra: {
        max: 100,
        iddleTimeoutMillis: 5000,
        connectionTimeoutMillis: 5000
    },
    dropSchema: process.env.NODE_ENV === "test",
    entities: [
        path.join(__dirname, "..", "entity", "**", "*.{ts,js}"),
        path.join(__dirname, "..", "entity", "*.{ts,js}")
    ],
    migrations: [
        path.join(__dirname, "..", "database", "migrations", "*.{ts,js}")
    ],
    subscribers: [
        path.join(__dirname, "..", "database", "subscribers", "*.{ts,js}")
    ],
    cache: {
        type: "ioredis",
        duration: 30000,
        options: {
            host: process.env.REDIS_HOST || "localhost",
            password: process.env.REDIS_PASSWORD || "<PASSWORD>",
            port: process.env.REDIS_HOST_PORT || 6379
        }
    }
}

export const AppDataSource = new DataSource(dataSourceOptions)
