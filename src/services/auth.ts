import { message } from "antd";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { addUserFirestore } from "./firestore";

export async function logIn(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user && result.user;
}

export async function register(
  email: string,
  password: string,
  displayName: string
) {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (result.user) {
    await updateProfile(result.user, { displayName });
    await addUserFirestore(result.user.uid, email);
    message.success("Usuário criado com sucesso.!");
    return result.user;
  }
}

export async function forgotPassword(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() =>
      message.info("Enviamos a você um e-mail de redefinição de senha.")
    )
    .catch((error) => {
      console.error;
      if (error.code == "auth/user-not-found") {
        console.error(error);
        return message.error("Não encontramos nenhum usuário com este email.");
      }
    });
}

export async function logOut() {
  return await signOut(auth);
}
