import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { toast } from "react-toastify";
import { Transaction } from "../types";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import { ModalAddTransaction } from "../components/ModalAddTransaction";
import { TransactionCard } from "../components/TransactionCard";
import { Numbers } from "../components/Numbers";
import { Footer } from "../components/Footer";
import { CircleNotch, Plus } from "phosphor-react";
import { addUserFirestore } from "../services/firestore";

export function DashboardPage() {
  const [openModalAddTransaction, setOpenModalAddTransaction] = useState(false);
  const [transactions, setTransactios] = useState<Transaction[]>();
  const [incomes, setIncomes] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  function handleOpenModalAddTransaction() {
    setOpenModalAddTransaction(true);
  }

  function handleCloseModalAddTransaction() {
    setOpenModalAddTransaction(false);
  }

  useEffect(() => {
    setIsLoading(true);

    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        try {
          let incomeCount = 0;
          let expenseCount = 0;
          const data = doc.data() as { transactions: Transaction[] };

          if (data.transactions) {
            setTransactios(
              data.transactions.sort(
                (a: Transaction, b: Transaction) =>
                  b.date.toMillis() - a.date.toMillis()
              )
            );

            for (let i in data.transactions) {
              if (data.transactions[i].value >= 0) {
                incomeCount += data.transactions[i].value / 100;
              } else {
                expenseCount += data.transactions[i].value / 100;
              }
            }
          }
          setIncomes(incomeCount);
          setExpenses(expenseCount);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Erro inesperado.:!");
          setIsLoading(false);
        }
      });

      return unsub;
    }
  }, []);

  return (
    <div className="flex flex-col bg-slate-300 min-h-screen">
      <Header />

      <div className="max-w-xl overflow-hidden flex mx-auto w-full flex-col gap-4 px-4 -translate-y-6">
        <Numbers incomes={incomes} expenses={expenses} loading={isLoading} />

        <button
          onClick={handleOpenModalAddTransaction}
          className="group flex items-center justify-center gap-2 bg-cyan-700 text-slate-100 text-base shadow-slate-500 shadow-md rounded-md py-2 px-4 w-fit ml-auto transition hover:bg-cyan-800 hover:shadow-slate-600 hover:shadow-lg"
        >
          <Plus
            size={32}
            className="group duration-300 group-hover:rotate-90"
          />
          Nova Transação
        </button>

        <div className="h-[1px] my-4 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 rounded-full"></div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <CircleNotch
              className="text-slate-500 animate-spin self-center"
              size={48}
            />
          ) : (
            transactions &&
            transactions.map((transaction) => {
              return (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              );
            })
          )}
        </div>
      </div>

      <Footer className="mt-auto" />

      {openModalAddTransaction && (
        <ModalAddTransaction
          open={openModalAddTransaction}
          handleClose={handleCloseModalAddTransaction}
        />
      )}
    </div>
  );
}
