import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../services/firebase";
import { logIn, register, forgotPassword, logOut } from "../services/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null | undefined;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleNewAccount: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

  async function handleSignIn(email: string, password: string) {
    const user = await logIn(email, password);
    user && setUser(user);
  }

  async function handleNewAccount(
    email: string,
    password: string,
    displayName: string
  ) {
    const user = await register(email, password, displayName);

    if (user) {
      setUser(user);
      navigate("/");
    }
  }

  async function handleForgotPassword(email: string) {
    await forgotPassword(email);
  }

  async function handleSignOut() {
    logOut();
    setUser(null);
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
