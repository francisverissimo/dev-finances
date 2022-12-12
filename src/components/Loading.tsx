import { CircleNotch } from "phosphor-react";
import { Logo } from "./Logo";

export function Loading() {
  return (
    <div className="bg-gradient-to-b from-slate-600 via-slate-400 to-slate-200 flex flex-col gap-4 items-center justify-center w-full min-h-screen">
      <Logo />

      <CircleNotch className="animate-spin text-teal-700" size={42} />
    </div>
  );
}