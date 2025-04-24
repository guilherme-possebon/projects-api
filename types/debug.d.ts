import { IUser } from "./user";

export interface IDebug {
  id: number;
  debug_title: string;
  debug_content: string;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}
