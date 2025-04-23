import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("cache_locks")
export class CacheLock {
  @PrimaryColumn()
  key: string;

  @Column()
  owner: string;

  @Column()
  expiration: number;
}
