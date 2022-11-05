import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "./services/firebase";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  Plus,
} from "phosphor-react";
import { Header } from "./components/Header";
import { ModalAddTransaction } from "./components/ModalAddTransaction";
import { TransactionCard } from "./components/TransactionCard";
import { Transaction } from "./types";

export function App() {
  const [openModalAddTransaction, setOpenModalAddTransaction] = useState(false);
  const [transactions, setTransactios] = useState<Transaction[]>();
  const [incomes, setIncomes] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  function handleOpenModalAddTransaction() {
    setOpenModalAddTransaction(true);
  }

  function handleCloseModalAddTransaction() {
    setOpenModalAddTransaction(false);
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", "francissv97@gmail.com"),
      (doc) => {
        const data = Object.values(doc.data() as Transaction[]);

        setTransactios(
          data.sort(
            (a: Transaction, b: Transaction) =>
              a.date.toMillis() - b.date.toMillis()
          )
        );

        if (data) {
          data.forEach(
            (transaction) =>
              transaction.value >= 0 &&
              setIncomes(
                incomes
                  ? incomes + transaction.value / 100
                  : 0 + transaction.value / 100
              )
          );

          data.forEach(
            (transaction) =>
              transaction.value < 0 &&
              setExpenses(
                expenses
                  ? expenses + transaction.value / 100
                  : 0 + transaction.value / 100
              )
          );
        }
      }
    );

    return unsub;
  }, []);

  return (
    <div className="bg-gradient-to-t from-slate-500 via-slate-300 to-slate-300 min-h-screen bg-no-repeat">
      <Header />

      <div className="max-w-xl mx-auto flex flex-col gap-4 px-4 -translate-y-6">
        <div className="flex bg-slate-200 justify-between text-green-700 p-4 rounded-md shadow-lg">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-600">Entradas</span>
            <span className="text-xl font-medium">
              {incomes.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <ArrowCircleUp size={32} />
        </div>

        <div className="flex bg-slate-200 justify-between text-red-900 p-4 rounded-md shadow-lg">
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

        <div className="flex justify-between bg-gradient-to-r from-slate-700 to-slate-500 p-4 text-zinc-100 rounded-md shadow-lg">
          <div className="flex flex-col gap-2">
            <span>Total</span>
            <span className="text-xl font-medium">
              {(incomes + expenses).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <CurrencyDollar size={32} />
        </div>

        <button
          onClick={handleOpenModalAddTransaction}
          className="group flex items-center justify-center gap-2 bg-cyan-700 text-zinc-100 text-base rounded-md py-2 px-4 w-fit ml-auto transition hover:bg-cyan-800 hover:shadow-lg"
        >
          <Plus
            size={32}
            className="group duration-300 group-hover:rotate-90"
          />
          Nova Transação
        </button>

        <div className="h-[1px] my-4 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-400 rounded-md"></div>

        <div className="flex flex-col gap-4">
          {transactions &&
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                description={transaction.description}
                date={transaction.date}
                value={transaction.value}
              />
            ))}
        </div>
      </div>

      {openModalAddTransaction && (
        <ModalAddTransaction
          open={openModalAddTransaction}
          handleClose={handleCloseModalAddTransaction}
        />
      )}
    </div>
  );
}
