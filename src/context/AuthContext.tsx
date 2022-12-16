import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../services/firebase";
import { login, register, forgotPassword, logout } from "../services/auth";
import { addUserFirestore } from "../services/firestore";

interface AuthContextType {
  user: User | null | undefined;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleNewAccount: (email: string, password: string) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>();

  async function handleSignIn(email: string, password: string) {
    const user = await login(email, password);
    if (user) setUser(user);
  }

  async function handleNewAccount(email: string, password: string) {
    const user = await register(email, password);
    if (user && user.email) {
      await addUserFirestore(user.uid, user.email);
      setUser(user);
    }
  }

  async function handleForgotPassword(email: string) {
    await forgotPassword(email);
  }

  async function handleSignOut() {
    logout();
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      }, 1000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        handleNewAccount,
        handleForgotPassword,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
