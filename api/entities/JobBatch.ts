import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("job_batches")
export class JobBatch {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  total_jobs: number;

  @Column()
  pending_jobs: number;

  @Column()
  failed_jobs: number;

  @Column("text")
  failed_job_ids: string;

  @Column("text", { nullable: true })
  options: string;

  @Column({ type: "int", nullable: true })
  cancelled_at: number;

  @Column({ type: "int" })
  created_at: number;

  @Column({ type: "int", nullable: true })
  finished_at: number;
}
