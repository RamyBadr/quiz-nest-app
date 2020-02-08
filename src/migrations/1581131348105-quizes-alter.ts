import {MigrationInterface, QueryRunner} from "typeorm";

export class quizesAlter1581131348105 implements MigrationInterface {
    name = 'quizesAlter1581131348105'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "quizes" ADD "author_id" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "quizes" ALTER COLUMN "title" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "quizes" ALTER COLUMN "ispublished" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "quizes" ALTER COLUMN "ispublished" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "quizes" ALTER COLUMN "title" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "quizes" DROP COLUMN "author_id"`, undefined);
    }

}
