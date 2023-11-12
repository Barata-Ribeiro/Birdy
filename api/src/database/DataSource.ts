import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { __TEST__ } from "../constants";
import { MainSeeder } from "../seeds/MainSeeder";

const selectedDatabasePort: number = process.env.DB_PORT
	? parseInt(process.env.DB_PORT, 10)
	: 5432;

const dataSourceOptions: DataSourceOptions & SeederOptions = {
	name: "default",
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: selectedDatabasePort,
	username: process.env.DB_USERNAME || "default",
	password: process.env.DB_PASSWORD || "default",
	database: process.env.DB_DATABASE || "default",
	logging: true,
	synchronize: true,
	migrationsRun: true,
	dropSchema: __TEST__,
	entities: [
		path.join(__dirname, "..", "entities", "**", "*.{ts,js}"),
		path.join(__dirname, "..", "entities", "*.{ts,js}"),
	],
	migrations: [
		path.join(__dirname, "..", "database", "migrations", "*.{ts,js}"),
	],
	subscribers: [
		path.join(__dirname, "..", "database", "subscribers", "*.{ts,js}"),
	],
	seeds: [MainSeeder],
	cache: {
		type: "ioredis",
		duration: 30000,
		options: {
			host: process.env.REDIS_HOST || "localhost",
			password: process.env.REDIS_PASSWORD || "<PASSWORD>",
			port: process.env.REDIS_HOST_PORT || 6379,
		},
	},
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
