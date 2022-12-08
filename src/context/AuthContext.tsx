import { createContext, ReactNode, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { createNewUserDocumentInFirestore } from "../services/firestore";

interface AuthContextType {
  user: User | null | undefined;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  sendEmailToResetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>();

  async function loginWithEmailAndPassword(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result.user) setUser(result.user);
  }

  async function signUpWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string
  ) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (result.user) {
      await updateProfile(result.user, { displayName });
      await createNewUserDocumentInFirestore(result.user.uid, email);
      setUser(result.user);
    }
  }

  async function sendEmailToResetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmailAndPassword,
        signUpWithEmailAndPassword,
        sendEmailToResetPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
