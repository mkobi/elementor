import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity({ name: "sessions" })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public ip: string;

  @Column()
  public userAgent: string;

  @Column({ nullable: true })
  public isOnline: boolean;

  @ManyToOne(
    type => User,
    user => user.sessions
  )
  @JoinColumn({ name: "userId" })
  public user: User;

  @Column()
  public userId: string;
}
