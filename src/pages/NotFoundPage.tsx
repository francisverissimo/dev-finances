import { useNavigate } from "react-router-dom";
import { ManLost } from "../assets/ManLost";
import { Footer } from "../components/Footer";
import { ArrowLeft } from "phosphor-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-gradient-to-t from-slate-500 via-slate-200 to-slate-200 justify-center items-center px-2 relative">
      <div className="flex flex-1 flex-col justify-center">
        <ManLost />

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 p-2 text-xl text-slate-600 border-2 rounded w-fit mx-auto transition border-slate-600 hover:border-cyan-600 hover:text-cyan-600"
        >
          <ArrowLeft size={32} />
          Voltar ao início
        </button>
      </div>

      <Footer className="pb-4" />
    </div>
  );
}
