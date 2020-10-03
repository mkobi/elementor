import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME = "users";
const columns = [
  {
    name: "id",
    type: "varchar",
    isPrimary: true
  },
  {
    name: "createdAt",
    type: "timestamp",
    default: "NOW()"
  },
  {
    name: "updatedAt",
    type: "timestamp",
    default: "NOW()"
  },
  {
    name: "username",
    type: "varchar"
  },
  {
    name: "password",
    type: "varchar"
  }
];

export class createUserTable1601730404737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
