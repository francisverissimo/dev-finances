import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  Plus,
  PlusCircle,
} from "phosphor-react";
import { useState } from "react";
import { Header } from "./components/Header";
import { ModalAddTransaction } from "./components/ModalAddTransaction";

export function App() {
  const [incoming, setIncoming] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);

  function handleCloseModalAddTransaction() {
    setIsModalAddTransactionOpen(false);
  }

  return (
    <>
      <Header />

      <div className="max-w-xl mx-auto flex flex-col gap-2 px-4 -translate-y-6">
        <div className="flex bg-slate-100 justify-between text-green-700 p-4 rounded shadow-lg">
          <div className="flex flex-col gap-2">
            <span>Entradas</span>
            <span className="text-xl font-medium">
              {incoming.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <ArrowCircleUp size={32} />
        </div>

        <div className="flex bg-slate-100 justify-between text-red-900 p-4 rounded shadow-lg">
          <div className="flex flex-col gap-2">
            <span>Saídas</span>
            <span className="text-xl font-medium">
              {expenses.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <ArrowCircleDown size={32} />
        </div>

        <div className="flex justify-between bg-gradient-to-r from-slate-700 to-slate-500 p-4 text-zinc-100 rounded shadow-lg">
          <div className="flex flex-col gap-2">
            <span>Total</span>
            <span className="text-xl font-medium">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <CurrencyDollar size={32} />
        </div>

        <button
          onClick={() => setIsModalAddTransactionOpen(true)}
          className="group flex items-center justify-center gap-2 bg-cyan-700 text-zinc-100 text-lg rounded p-2 w-fit ml-auto transition hover:bg-cyan-800 hover:shadow-lg"
        >
          <PlusCircle
            size={36}
            className="group duration-300 group-hover:rotate-90"
          />
          Nova Transação
        </button>
      </div>

      <ModalAddTransaction
        open={isModalAddTransactionOpen}
        handleClose={handleCloseModalAddTransaction}
      />
    </>
  );
}
