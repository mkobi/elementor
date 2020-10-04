import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm";

const TABLE_NAME = "sessions";
const FK_COLUMN_NAME = "userId";
const REFERENCED_FK_COLUMN_NAME = "id";
const REFERENCED_TABLE_NAME = "users";

const columns = [
  {
    name: "id",
    type: "varchar",
    isPrimary: true
  },
  {
    name: FK_COLUMN_NAME,
    type: "varchar"
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
    name: "ip",
    type: "varchar"
  },
  {
    name: "userAgent",
    type: "varchar"
  },
  {
    name: "isOnline",
    type: "boolean",
    default: true
  }
];

export class addSessionsTable1601797876487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns
      }),
      true
    );

    await queryRunner.createForeignKey(
      TABLE_NAME,
      new TableForeignKey({
        columnNames: [FK_COLUMN_NAME],
        referencedColumnNames: [REFERENCED_FK_COLUMN_NAME],
        referencedTableName: REFERENCED_TABLE_NAME,
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
