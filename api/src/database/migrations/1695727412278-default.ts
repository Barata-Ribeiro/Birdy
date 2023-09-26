import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695727412278 implements MigrationInterface {
    name = 'Default1695727412278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_likes" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_likes" ADD CONSTRAINT "UQ_e07476372baa91c75e24164725e" UNIQUE ("user_id", "photo_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_likes" DROP CONSTRAINT "UQ_e07476372baa91c75e24164725e"`);
        await queryRunner.query(`ALTER TABLE "user_likes" DROP COLUMN "isActive"`);
    }

}
