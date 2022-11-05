import { Timestamp } from "firebase/firestore";

export interface TransactionInterace {
  id: string;
  description: string;
  value: number;
  date: Timestamp;
}
