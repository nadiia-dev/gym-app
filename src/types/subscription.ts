import { IPlan } from "./plan";
import { IUser } from "./user";

export interface ISubscription {
  id: string;
  plan_id: string;
  plan: IPlan;
  user_id: string;
  user: IUser;
  payment_id: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  amount: number;
  total_duration: number;

  created_at: string;
}
