// entities/Debug.ts
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

@Entity("debugs")
export class Debug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  debug_title: string;

  @Column("text")
  debug_content: string;

  @ManyToOne(() => User, (user) => user.debugs)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
