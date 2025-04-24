import { IDebug } from "./debug";

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  password: string;
  remember_token: string | null;
  created_at: Date;
  updated_at: Date;
  debugs: IDebug[];
}
