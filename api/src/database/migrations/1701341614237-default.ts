import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701341614237 implements MigrationInterface {
    name = 'Default1701341614237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_8dbcfb3659d2a1e8641f4b0063" ON "user_likes" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e68f390b7b060b7a5136ee22a" ON "user_likes" ("photoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41ade296281571d007a667256a" ON "photos" ("authorID") `);
        await queryRunner.query(`CREATE INDEX "IDX_66bf6e9c966fcbcbcf112dc5fd" ON "photos" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_40995a3fd6708c25b15dae09dd" ON "photos" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_b75a16d97de88507aa4bf6621e" ON "photos" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8a67bcaa0e80da405008dca87" ON "comments" ("authorID") `);
        await queryRunner.query(`CREATE INDEX "IDX_94ffa05f2fb3da114904ba901b" ON "comments" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_6300484b604263eaae8a6aab88" ON "user_follows" ("followerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c6c27f12c4e972eab4b3aaccb" ON "user_follows" ("followingId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7c6c27f12c4e972eab4b3aaccb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6300484b604263eaae8a6aab88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94ffa05f2fb3da114904ba901b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8a67bcaa0e80da405008dca87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b75a16d97de88507aa4bf6621e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40995a3fd6708c25b15dae09dd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66bf6e9c966fcbcbcf112dc5fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41ade296281571d007a667256a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e68f390b7b060b7a5136ee22a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8dbcfb3659d2a1e8641f4b0063"`);
    }

}
