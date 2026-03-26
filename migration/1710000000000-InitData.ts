import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitData1710000000000 implements MigrationInterface {
    name = 'InitData1710000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "sports" ("id" SERIAL NOT NULL, PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "entity_sport_assignments" ("id" SERIAL NOT NULL, "sport_id" integer NOT NULL, PRIMARY KEY ("id"))`);
        
        // Wait, to safely fail ONLY on the ALTER TABLE, we must ensure data isn't duplicated on re-runs.
        await queryRunner.query(`TRUNCATE TABLE "entity_sport_assignments" CASCADE`);
        await queryRunner.query(`INSERT INTO "entity_sport_assignments" ("sport_id") VALUES (999)`);
        
        // This constraint creation will throw the exact FK error because sport_id 999 does not exist in 'sports'
        await queryRunner.query(`ALTER TABLE "entity_sport_assignments" ADD CONSTRAINT "FK_cde3da1507576f7a4b231fcb2b2" FOREIGN KEY ("sport_id") REFERENCES "sports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entity_sport_assignments" DROP CONSTRAINT "FK_cde3da1507576f7a4b231fcb2b2"`);
        await queryRunner.query(`DROP TABLE "entity_sport_assignments"`);
        await queryRunner.query(`DROP TABLE "sports"`);
    }
}
