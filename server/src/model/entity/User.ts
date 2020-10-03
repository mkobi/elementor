import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
