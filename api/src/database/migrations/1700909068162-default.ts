import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700909068162 implements MigrationInterface {
    name = 'Default1700909068162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_follows" ADD CONSTRAINT "UQ_48050dfc1d2514f4c2059f155eb" UNIQUE ("followerId", "followingId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_follows" DROP CONSTRAINT "UQ_48050dfc1d2514f4c2059f155eb"`);
    }

}
