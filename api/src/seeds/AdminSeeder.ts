/* eslint-disable @typescript-eslint/no-unused-vars */

import * as bcrypt from "bcrypt";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../entities/User";

export default class AdminSeeder implements Seeder {
	track?: boolean | undefined;
	async run(
		dataSource: DataSource,
		_factoryManager: SeederFactoryManager
	): Promise<void> {
		const userRepository = dataSource.getRepository(User);

		const userData = {
			username: process.env.ADMIN_USERNAME,
			email: process.env.ADMIN_EMAIL,
			avatarUrl:
				"https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg",
			coverImageUrl: "https://source.unsplash.com/random/?birds",
			biography: "I am an owlsome administrator. How can I help you?",
			password: await bcrypt.hash(
				process.env.ADMIN_PASSWORD?.toString() || "admin",
				10
			),
			role: "admin",
		};

		const userExists = await userRepository.findOneBy({
			email: userData.email,
		});

		if (!userExists) {
			const newUser = userRepository.create(userData);
			await userRepository.save(newUser);
		}
	}
}
