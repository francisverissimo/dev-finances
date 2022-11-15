import { SignOut } from "phosphor-react";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "./Logo";

export function Header() {
  const { logOut } = useAuth();

  return (
    <div className="bg-gradient-to-tr from-slate-800 to-slate-600">
      <div className="flex justify-between max-w-xl mx-auto px-4 pt-4 pb-10">
        <Logo className="text-slate-200" />

        <div className="group cursor-pointer px-2" onClick={logOut}>
          <SignOut
            className="group transition text-red-700 group-hover:text-red-600"
            size={32}
          />
        </div>
      </div>
    </div>
  );
}
