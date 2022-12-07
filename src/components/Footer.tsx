import { ClassAttributes } from "react";

interface Props extends ClassAttributes<HTMLDivElement> {
  className?: string;
}

export function Footer({ className }: Props) {
  return (
    <div className={`text-center pb-2 ${className}`}>
      <span>
        <a
          href="https://francissportfolio.vercel.app/"
          target="_blank"
          className="hover:text-cyan-500 transition"
        >
          {` Francis S. Verissimo `}
        </a>
        &copy; {new Date().getFullYear()}
      </span>
    </div>
  );
}
