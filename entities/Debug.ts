import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { IUser } from "@/@types/user";

@Entity("debugs")
export class Debug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  debug_title: string;

  @Column("text")
  debug_content: string;

  @ManyToOne(() => User, (user: IUser) => user.debugs)
  @JoinColumn({ name: "user_id" })
  user: IUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
