import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Week } from "./Week";
import "reflect-metadata";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  title: string;

  @Column("text")
  note: string;

  @ManyToOne(() => Week, (week) => week.notes)
  @JoinColumn({ name: "week_id" })
  week: Week;
}
