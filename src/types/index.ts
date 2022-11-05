import { Timestamp } from "firebase/firestore";

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: Timestamp;
}
