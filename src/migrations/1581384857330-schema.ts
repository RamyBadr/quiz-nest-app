import { MigrationInterface, QueryRunner } from 'typeorm';

export class schema1581384857330 implements MigrationInterface {
    name = 'schema1581384857330';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TYPE "users_role_enum" AS ENUM('USER', 'ADMIN', 'TEACHER')`,
            undefined,
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "role" "users_role_enum" NOT NULL DEFAULT 'USER', "email" character varying, "password" character varying, "phone" character varying, "avatar" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `CREATE TABLE "quizes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "ispublished" boolean NOT NULL DEFAULT false, "author_id" uuid, CONSTRAINT "PK_2c6a29e4f537875fdef1f2e5881" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_81384d952822996cab8325da14" ON "quizes" ("title", "author_id") `,
            undefined,
        );
        await queryRunner.query(
            `CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "ispublished" boolean NOT NULL DEFAULT false, "quiz_id" uuid, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_d7c29be02a99ec0bd718d0353e" ON "questions" ("text", "quiz_id") `,
            undefined,
        );
        await queryRunner.query(
            `CREATE TABLE "answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "iscorrect" boolean NOT NULL DEFAULT false, "question_id" uuid, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_e8b96e302d92add5289fe17206" ON "answers" ("question_id", "text") `,
            undefined,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_3a3959e5d966fdcb71e968a3c5" ON "answers" ("question_id", "iscorrect") WHERE iscorrect=true`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "quizes" ADD CONSTRAINT "FK_c53dcc93d13da0325edc6a03f16" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "questions" ADD CONSTRAINT "FK_46b3c125e02f7242662e4ccb307" FOREIGN KEY ("quiz_id") REFERENCES "quizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "questions" DROP CONSTRAINT "FK_46b3c125e02f7242662e4ccb307"`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "quizes" DROP CONSTRAINT "FK_c53dcc93d13da0325edc6a03f16"`,
            undefined,
        );
        await queryRunner.query(
            `DROP INDEX "IDX_3a3959e5d966fdcb71e968a3c5"`,
            undefined,
        );
        await queryRunner.query(
            `DROP INDEX "IDX_e8b96e302d92add5289fe17206"`,
            undefined,
        );
        await queryRunner.query(`DROP TABLE "answers"`, undefined);
        await queryRunner.query(
            `DROP INDEX "IDX_d7c29be02a99ec0bd718d0353e"`,
            undefined,
        );
        await queryRunner.query(`DROP TABLE "questions"`, undefined);
        await queryRunner.query(
            `DROP INDEX "IDX_81384d952822996cab8325da14"`,
            undefined,
        );
        await queryRunner.query(`DROP TABLE "quizes"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TYPE "users_role_enum"`, undefined);
    }
}
