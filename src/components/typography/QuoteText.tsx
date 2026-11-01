import { ReactNode } from "react";

interface QuoteTextProps {
  children: ReactNode;
  className?: string;
}

export function QuoteText({ children, className = "" }: QuoteTextProps) {
  return (
    <p
      className={`text-card-foreground text-lg sm:text-xl font-medium ${className}`}
    >
      {" "}
      {children}{" "}
    </p>
  );
}
