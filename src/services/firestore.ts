import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { message } from "antd";
import { AddTransactionFormFieldValues, Transaction } from "../types";
import {
  generateTransactionID,
  passDateInMomentFormatToDateFormat,
  validateTransactionValue,
} from "../utils";

export async function addUserFirestore(id: string, email: string) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", id), {
        email: email,
        transactions: [],
      });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    message.error("Erro ao tentar criar base de dados para este usuário..!");
  }
}

export async function addTransaction(
  userId: string,
  data: AddTransactionFormFieldValues
) {
  const docRef = doc(db, "users", userId);
  const id = await generateTransactionID();
  const description = data.description;
  const date = await passDateInMomentFormatToDateFormat(data.date);
  const value =
    data.type == "expense"
      ? validateTransactionValue(data.value) * -100
      : validateTransactionValue(data.value) * 100;

  await updateDoc(docRef, {
    transactions: arrayUnion({
      id,
      description,
      date: date,
      value,
    }),
  }).catch((error) => console.error(error));
}

export async function removeTransaction(userId: string, data: Transaction) {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    transactions: arrayRemove(data),
  }).catch((error) => console.error(error));
}
