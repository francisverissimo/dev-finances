import { Timestamp } from "firebase/firestore";
import { TrashSimple } from "phosphor-react";

interface TransactionCardProps {
  description: string;
  type: "expense" | "incoming";
  value: number;
  date: Timestamp;
}

export function TransactionCard({
  description,
  type,
  date,
  value,
}: TransactionCardProps) {
  const dateConvertedToDate = new Date(date.toMillis()).toLocaleDateString(
    "pt-BR"
  );

  const valueConvertedToMoney = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex flex-col gap-2 bg-slate-200 p-4 rounded shadow-lg">
      <span className="text-zinc-600 text-lg font-medium break-words">
        {description}
      </span>

      <div className="flex gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <span
            className={`${
              type == "incoming" ? "text-green-700" : "text-red-700"
            } text-base font-medium`}
          >
            {valueConvertedToMoney}
          </span>
          <span className="text-zinc-600 font-medium">
            {dateConvertedToDate}
          </span>
        </div>

        <button className="place-self-end">
          <TrashSimple
            className="text-red-700 transition hover:text-red-500 hover:-translate-y-1"
            size={32}
          />
        </button>
      </div>
    </div>
  );
}
