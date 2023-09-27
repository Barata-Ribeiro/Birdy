import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695812527306 implements MigrationInterface {
    name = 'Default1695812527306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "photoId" uuid NOT NULL, "likedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cf89399f12f9c6c8e3c96710fc4" UNIQUE ("userId", "photoId"), CONSTRAINT "PK_766a84015341ed59620e2542747" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "authorID" uuid NOT NULL, "authorName" character varying(20) NOT NULL, "title" text NOT NULL, "imageUrl" character varying(2048) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "metaBirdsize" integer NOT NULL, "metaBirdhabitat" text NOT NULL, "metaTotal_comments" integer NOT NULL DEFAULT '0', "metaTotal_hits" integer NOT NULL DEFAULT '0', "metaTotal_likes" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(20) NOT NULL, "password" character varying(128) NOT NULL, "email" character varying(255) NOT NULL, "refreshToken" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "authorID" uuid NOT NULL, "authorName" character varying(20) NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "photoId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_likes" ADD CONSTRAINT "FK_8dbcfb3659d2a1e8641f4b0063d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_likes" ADD CONSTRAINT "FK_5e68f390b7b060b7a5136ee22a5" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_41ade296281571d007a667256a0" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d8a67bcaa0e80da405008dca871" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_055cf70f93cb0e7dea47f9bd9ae" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_055cf70f93cb0e7dea47f9bd9ae"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d8a67bcaa0e80da405008dca871"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_41ade296281571d007a667256a0"`);
        await queryRunner.query(`ALTER TABLE "user_likes" DROP CONSTRAINT "FK_5e68f390b7b060b7a5136ee22a5"`);
        await queryRunner.query(`ALTER TABLE "user_likes" DROP CONSTRAINT "FK_8dbcfb3659d2a1e8641f4b0063d"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "user_likes"`);
    }

}
