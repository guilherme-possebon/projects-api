import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("password_reset_tokens")
export class PasswordResetToken {
  @PrimaryColumn()
  email: string;

  @Column()
  token: string;

  @Column({ type: "timestamp", nullable: true })
  created_at: Date;
}
