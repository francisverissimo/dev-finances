import { message } from "antd";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { auth } from "./firebase";
import { addUserFirestore } from "./firestore";

export async function login(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user && result.user;
  } catch (err) {
    const error = err as FirebaseError;
    console.error(error);

    if (error.code == "auth/invalid-email") {
      message.error("Email inválido.");
    }
  }
}

export async function register(
  email: string,
  password: string,
  displayName: string
) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (result.user) {
      await updateProfile(result.user, { displayName });
      await addUserFirestore(result.user.uid, email);
      message.success("Usuário criado com sucesso.!");
      return result.user;
    }
  } catch (err) {
    const error = err as FirebaseError;
    console.error(error);

    if (error.code == "auth/weak-password") {
      message.error("A senha deve ter pelo menos 6 caracteres.");
    }

    if (error.code == "auth/email-already-in-use") {
      message.error("Este email já está sendo usado.");
    }

    return null;
  }
}

export async function forgotPassword(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() =>
      message.info("Enviamos a você um e-mail de redefinição de senha.")
    )
    .catch((error) => {
      console.error(error);

      if (error.code == "auth/user-not-found") {
        return message.error("Não encontramos nenhum usuário com este email.:");
      }

      if (error.code == "auth/invalid-email") {
        return message.error("Email inválido.:");
      }
    });
}

export async function logout() {
  return await signOut(auth).catch((error) => console.error(error));
}
