import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Session } from "./Session";

export const USERS_TABLE_NAME = "users";

@Entity({ name: USERS_TABLE_NAME })
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

  @OneToMany(
    type => Session,
    session => session.user
  )
  public sessions: Session[];
}
