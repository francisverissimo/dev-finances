import { ClassAttributes } from "react";

interface Props extends ClassAttributes<HTMLDivElement> {
  className?: string;
}

export function Logo({ className }: Props) {
  return (
    <strong className={`text-xl font-medium ${className}`}>
      DevFinance<span className="text-xl text-teal-700">$</span>
    </strong>
  );
}
