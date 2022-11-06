import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { AddTransactionFormFieldValues, Transaction } from "../types";
import {
  generateTransactionID,
  passDateInMomentFormatToDateFormat,
} from "../utils";

export async function addTransaction(data: AddTransactionFormFieldValues) {
  const docRef = doc(db, "users", "francissv97@gmail.com");
  const id = await generateTransactionID();
  const description = data.description;
  const date = await passDateInMomentFormatToDateFormat(data.date);
  const value = data.type == "expense" ? data.value * -100 : data.value * 100;

  await updateDoc(docRef, {
    transactions: arrayUnion({
      id,
      description,
      date: date,
      value,
    }),
  }).catch((error) => console.error(error));
}

export async function removeTransaction(data: Transaction) {
  const docRef = doc(db, "users", "francissv97@gmail.com");

  await updateDoc(docRef, {
    transactions: arrayRemove(data),
  }).catch((error) => console.error(error));
}
