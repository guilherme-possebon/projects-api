import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("failed_jobs")
export class FailedJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column("text")
  connection: string;

  @Column("text")
  queue: string;

  @Column("text")
  payload: string;

  @Column("text")
  exception: string;

  @CreateDateColumn({ type: "timestamp" })
  failed_at: Date;
}
