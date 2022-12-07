import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: Timestamp;
}

export interface AddTransactionFormFieldValues {
  description: string;
  type: "expense" | "income";
  value: number;
  date: Moment;
}
