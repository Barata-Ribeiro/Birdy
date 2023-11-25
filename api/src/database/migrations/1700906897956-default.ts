import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700906897956 implements MigrationInterface {
    name = 'Default1700906897956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_follows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startedFollowing" TIMESTAMP NOT NULL DEFAULT now(), "followerId" uuid, "followingId" uuid, CONSTRAINT "PK_da8e8793113adf3015952880966" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_follows" ADD CONSTRAINT "FK_6300484b604263eaae8a6aab88d" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_follows" ADD CONSTRAINT "FK_7c6c27f12c4e972eab4b3aaccbf" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_follows" DROP CONSTRAINT "FK_7c6c27f12c4e972eab4b3aaccbf"`);
        await queryRunner.query(`ALTER TABLE "user_follows" DROP CONSTRAINT "FK_6300484b604263eaae8a6aab88d"`);
        await queryRunner.query(`DROP TABLE "user_follows"`);
    }

}
