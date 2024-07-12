import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from "typeorm-extension"
import path = require("path")

const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: "postgres",
    url: process.env.POSTGRES_URI ?? process.env.POSTGRES_URI_TEST,
    database: process.env.POSTGRES_DB ?? "test",
    synchronize: true,
    logging: true,
    migrationsRun: true,
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
    migrations: [path.join(__dirname, "..", "database", "migrations", "*.{ts,js}")],
    subscribers: [path.join(__dirname, "..", "database", "subscribers", "*.{ts,js}")]
}

export const AppDataSource = new DataSource(dataSourceOptions)
