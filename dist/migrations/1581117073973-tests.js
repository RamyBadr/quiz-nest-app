"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class tests1581117073973 {
    constructor() {
        this.name = 'tests1581117073973';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "quizs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "ispublished" boolean, CONSTRAINT "PK_3909747b0e3219df9a34c0c8901" PRIMARY KEY ("id"))`, undefined);
            yield queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`, undefined);
            yield queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('USER', 'ADMIN', 'TEACHER')`, undefined);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`, undefined);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum" USING "role"::"text"::"users_role_enum"`, undefined);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER'`, undefined);
            yield queryRunner.query(`DROP TYPE "users_role_enum_old"`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "users_role_enum_old" AS ENUM('USER')`, undefined);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`, undefined);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum_old" USING "role"::"text"::"users_role_enum_old"`, undefined);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER'`, undefined);
            yield queryRunner.query(`DROP TYPE "users_role_enum"`, undefined);
            yield queryRunner.query(`ALTER TYPE "users_role_enum_old" RENAME TO  "users_role_enum"`, undefined);
            yield queryRunner.query(`DROP TABLE "quizs"`, undefined);
        });
    }
}
exports.tests1581117073973 = tests1581117073973;
//# sourceMappingURL=1581117073973-tests.js.map