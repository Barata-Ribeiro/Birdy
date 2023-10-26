/* eslint-disable @typescript-eslint/no-unused-vars */

import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import AdminSeeder from "./AdminSeeder";

export class MainSeeder implements Seeder {
	track?: boolean | undefined;
	async run(
		dataSource: DataSource,
		_factoryManager: SeederFactoryManager
	): Promise<void> {
		await runSeeder(dataSource, AdminSeeder);
	}
}
