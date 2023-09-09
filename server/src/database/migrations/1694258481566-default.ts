import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694258481566 implements MigrationInterface {
    name = 'Default1694258481566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_092129956be42ed4058282d9693"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_553615cd0596dbaa093da51e98a"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "src"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "imageUrl" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "metaHabitat"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "metaHabitat" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_092129956be42ed4058282d9693" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_553615cd0596dbaa093da51e98a" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_553615cd0596dbaa093da51e98a"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_092129956be42ed4058282d9693"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "metaHabitat"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "metaHabitat" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "src" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_553615cd0596dbaa093da51e98a" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_092129956be42ed4058282d9693" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
