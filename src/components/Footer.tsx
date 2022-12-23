import { ClassAttributes } from "react";

interface FooterProps extends ClassAttributes<HTMLDivElement> {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <div className={`text-center pb-2 ${className}`}>
      <span>
        <a
          href="https://francissportfolio.vercel.app/"
          target="_blank"
          className="text-xs font-medium hover:text-cyan-700 transition"
        >
          {` Francis S. Verissimo `}
        </a>
        &copy; {new Date().getFullYear()}
      </span>
    </div>
  );
}
