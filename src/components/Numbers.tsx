import {
  ArrowCircleDown,
  ArrowCircleUp,
  CircleNotch,
  CurrencyDollar,
} from "phosphor-react";

interface NumbersProps {
  incomes: number;
  expenses: number;
  loading: boolean;
}

export function Numbers({ expenses, incomes, loading }: NumbersProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-1 bg-slate-200 justify-between text-green-700 p-4 rounded-md shadow-lg">
          {loading ? (
            <CircleNotch className="text-slate-500 animate-spin" size={32} />
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-slate-600">Entradas</span>
              <span className="text-lg font-medium">
                {incomes.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          )}
          <ArrowCircleUp size={32} />
        </div>

        <div className="flex flex-1 bg-slate-200 justify-between text-red-900 p-4 rounded-md shadow-lg">
          {loading ? (
            <CircleNotch className="text-slate-500 animate-spin" size={32} />
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-slate-600">Saídas</span>
              <span className="text-lg font-medium">
                {expenses.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          )}
          <ArrowCircleDown size={32} />
        </div>
      </div>

      <div
        className={`flex justify-between bg-gradient-to-r from-slate-700 to-slate-500 p-4 text-slate-100 ${
          incomes + expenses >= 0
            ? "from-green-900 via-green-700 to-green-500"
            : "from-red-900 via-red-700 to-red-500"
        } rounded-md shadow-lg`}
      >
        {loading ? (
          <CircleNotch className="text-slate-200 animate-spin" size={32} />
        ) : (
          <div className="flex flex-col gap-2">
            <span>Total</span>
            <span className="text-xl font-medium">
              {(incomes + expenses).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        )}
        <CurrencyDollar className="text-slate-200" size={32} />
      </div>
    </>
  );
}
