import { MigrationInterface, QueryRunner } from "typeorm";

export class Ess1689640114248 implements MigrationInterface {
    name = 'Ess1689640114248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_3acf7c55c319c4000e8056c1279\``);
        await queryRunner.query(`ALTER TABLE \`like\` CHANGE \`postId\` \`postId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_e8fb739f08d47955a39850fac23\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_3acf7c55c319c4000e8056c1279\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_3acf7c55c319c4000e8056c1279\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_e8fb739f08d47955a39850fac23\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`like\` CHANGE \`postId\` \`postId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_3acf7c55c319c4000e8056c1279\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`userId\``);
    }

}
