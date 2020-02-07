import {MigrationInterface, QueryRunner} from "typeorm";

export class tests1581117073973 implements MigrationInterface {
    name = 'tests1581117073973'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "quizs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "ispublished" boolean, CONSTRAINT "PK_3909747b0e3219df9a34c0c8901" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('USER', 'ADMIN', 'TEACHER')`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum" USING "role"::"text"::"users_role_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER'`, undefined);
        await queryRunner.query(`DROP TYPE "users_role_enum_old"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "users_role_enum_old" AS ENUM('USER')`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum_old" USING "role"::"text"::"users_role_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER'`, undefined);
        await queryRunner.query(`DROP TYPE "users_role_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "users_role_enum_old" RENAME TO  "users_role_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "quizs"`, undefined);
    }

}
