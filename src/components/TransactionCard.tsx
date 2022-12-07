import { Modal } from "antd";
import { Transaction } from "../types";
import { removeTransaction } from "../hooks/useFirestore";
import { TrashSimple } from "phosphor-react";
import { useAuth } from "../hooks/useAuth";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { confirm } = Modal;
  const { user } = useAuth();

  const dateConvertedToDate = new Date(
    transaction.date.toMillis()
  ).toLocaleDateString("pt-BR");

  const valueConvertedToMoney = (transaction.value / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  const showConfirmDeleteJob = () => {
    confirm({
      content: (
        <>
          <p className="text-lg text-zinc-600 mt-4">
            Deseja apagar{" "}
            <span className="text-red-600">{transaction.description}</span>{" "}
            permanentemente.?
          </p>
        </>
      ),
      cancelText: "Cancelar",
      okText: "EXCLUIR",
      okType: "danger",
      onOk: () => user?.email && removeTransaction(user.email, transaction),
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-slate-200 p-4 rounded-md shadow-lg">
      <span className="text-zinc-600 text-lg font-medium break-words">
        {transaction.description}
      </span>

      <div className="flex gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <span
            className={`${
              transaction.value >= 0 ? "text-green-700" : "text-red-700"
            } text-base font-medium`}
          >
            {valueConvertedToMoney}
          </span>
          <span className="text-zinc-600 font-medium">
            {dateConvertedToDate}
          </span>
        </div>

        <button
          className="place-self-end text-red-700 py-1 px-2 border border-transparent transition rounded-full hover:text-red-500 hover:border-red-500"
          onClick={showConfirmDeleteJob}
        >
          <TrashSimple size={32} />
        </button>
      </div>
    </div>
  );
}
