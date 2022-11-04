import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "./services/firebase";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  PlusCircle,
} from "phosphor-react";
import { Header } from "./components/Header";
import { ModalAddTransaction } from "./components/ModalAddTransaction";
import { TransactionCard } from "./components/TransactionCard";

interface TransactionInterace {
  id: string;
  description: string;
  type: "expense" | "incoming";
  value: number;
  date: Timestamp;
}

export function App() {
  const [openModalAddTransaction, setOpenModalAddTransaction] = useState(false);
  const [transactions, setTransactios] = useState<TransactionInterace[]>();

  const [incoming, setIncoming] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  function handleCloseModalAddTransaction() {
    setOpenModalAddTransaction(false);
  }

  useEffect(() => {
    async function getTransactions() {
      const docRef = doc(db, "users", "francissv97@gmail.com");

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const transactionsValues = Object.values(
          snapshot.data()
        ) as TransactionInterace[];

        setTransactios(transactionsValues);
      }
    }

    getTransactions();
  }, []);

  return (
    <div className="bg-gradient-to-t from-slate-500 via-slate-300 to-slate-300 min-h-screen bg-no-repeat">
      <Header />

      <div className="max-w-xl mx-auto flex flex-col gap-4 px-4 -translate-y-6">
        <div className="flex bg-slate-200 justify-between text-green-700 p-4 rounded shadow-lg">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-600">Entradas</span>
            <span className="text-xl font-medium">
              {incoming.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <ArrowCircleUp size={32} />
        </div>

        <div className="flex bg-slate-200 justify-between text-red-900 p-4 rounded shadow-lg">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-600">Saídas</span>
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
          onClick={() => setOpenModalAddTransaction(true)}
          className="group flex items-center justify-center gap-2 bg-cyan-700 text-zinc-100 text-lg rounded py-2 px-4 w-fit ml-auto transition hover:bg-cyan-800 hover:shadow-lg"
        >
          <PlusCircle
            size={36}
            className="group duration-300 group-hover:rotate-90"
          />
          Nova Transação
        </button>

        <div className="h-[1px] my-4 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-400"></div>

        <div className="flex flex-col gap-4">
          {transactions &&
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                description={transaction.description}
                date={transaction.date}
                type={transaction.type}
                value={transaction.value}
              />
            ))}
        </div>
      </div>

      <ModalAddTransaction
        open={openModalAddTransaction}
        handleClose={handleCloseModalAddTransaction}
      />
    </div>
  );
}
