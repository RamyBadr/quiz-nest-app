import {MigrationInterface, QueryRunner} from "typeorm";

export class quizes1581123706500 implements MigrationInterface {
    name = 'quizes1581123706500'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "quizes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "ispublished" boolean, CONSTRAINT "PK_2c6a29e4f537875fdef1f2e5881" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "quizes"`, undefined);
    }

}
