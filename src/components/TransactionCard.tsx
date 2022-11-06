import { Modal } from "antd";
import { Transaction } from "../types";
import { removeTransaction } from "../hooks/useFirestore";
import { TrashSimple } from "phosphor-react";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { confirm } = Modal;

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
      onOk: () => removeTransaction(transaction),
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

        <button className="place-self-end" onClick={showConfirmDeleteJob}>
          <TrashSimple
            className="text-red-700 transition hover:text-red-500 hover:-translate-y-1"
            size={32}
          />
        </button>
      </div>
    </div>
  );
}
