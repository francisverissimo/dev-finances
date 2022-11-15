import { createContext, ReactNode, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../services/firebase";

// export interface UserAuth {
//   id: string;
//   name: string;
//   avatar: string;
//   email: string | null;
// }

interface AuthContextType {
  user: User | null | undefined;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
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

    if (result.user) {
      console.log(result.user);

      setUser(result.user);
    }
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
        // const { displayName, photoURL, uid, email } = user;

        // if (!displayName || !photoURL) {
        //   throw new Error("Missing information from Google account.");
        // }

        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginWithEmailAndPassword, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
