const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init1741319071722 {
    name = 'Init1741319071722'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "due_date" TIMESTAMP WITH TIME ZONE NOT NULL, "complete" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "todo"`);
    }
}
