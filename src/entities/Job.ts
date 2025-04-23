import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  queue: string;

  @Column("text")
  payload: string;

  @Column({ type: "smallint" })
  attempts: number;

  @Column({ type: "integer", nullable: true })
  reserved_at: number;

  @Column({ type: "integer" })
  available_at: number;

  @Column({ type: "integer" })
  created_at: number;
}
