import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("logs")
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  log_title: string;

  @Column({ type: "json", nullable: true })
  session: JSON;

  @Column({ type: "json", nullable: true })
  post: JSON;

  @Column({ type: "json", nullable: true })
  server: JSON;

  @Column({ type: "json", nullable: true })
  planograma: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
