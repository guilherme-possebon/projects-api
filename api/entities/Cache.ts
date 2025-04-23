import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("cache")
export class Cache {
  @PrimaryColumn()
  key: string;

  @Column("text")
  value: string;

  @Column()
  expiration: number;
}
