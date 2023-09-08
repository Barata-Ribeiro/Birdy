import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694189694374 implements MigrationInterface {
  name = "Default1694189694374";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "authorID" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "photo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "src" character varying NOT NULL, "total_comments" integer NOT NULL, "authorID" uuid, "metaSize" integer NOT NULL, "metaHabitat" character varying NOT NULL, "metaAccess" integer NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_553615cd0596dbaa093da51e98a" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "photo" ADD CONSTRAINT "FK_092129956be42ed4058282d9693" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "photo" DROP CONSTRAINT "FK_092129956be42ed4058282d9693"'
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_553615cd0596dbaa093da51e98a"'
    );
    await queryRunner.query('DROP TABLE "photo"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "comment"');
  }
}
