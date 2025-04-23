import {
    Entity, PrimaryColumn, Column, ManyToOne, JoinColumn
  } from "typeorm";
  import { User } from "./User";

  @Entity("sessions")
  export class Session {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ nullable: true, length: 45 })
    ip_address: string;

    @Column({ nullable: true, type: "text" })
    user_agent: string;

    @Column("text")
    payload: string;

    @Column()
    last_activity: number;
  }
