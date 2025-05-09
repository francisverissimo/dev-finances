import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebase";
import { AddTransactionFormFieldValues, Transaction } from "../types";
import {
  generateTransactionID,
  passDateInMomentFormatToDateFormat,
  validateTransactionValue,
} from "../utils";

export async function addUserFirestore(userId: string, email: string) {
  try {
    const docRef = doc(db, "users", userId);

    await setDoc(docRef, {
      email: email,
      transactions: [],
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Erro ao tentar criar base de dados para este usuário..!");
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

export async function checkUserDocumentExists(userId: string) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return true;
    return false;
  } catch (error) {
    console.error(error);
  }
}
