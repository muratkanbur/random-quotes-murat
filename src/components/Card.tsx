import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  isLiked?: boolean;
  className?: string;
}

export const Card = ({ children, isLiked, className }: CardProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[230px] w-full max-w-md flex-col justify-between rounded-2xl border border-border bg-card p-6 text-center text-card-foreground shadow-md transition-all duration-300",
        isLiked
          ? "border-destructive/80 shadow-destructive/10"
          : "border-border shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};
