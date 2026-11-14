import { ReactNode } from "react";

interface SubtitleProps {
  element?: "h2" | "span";
  children: ReactNode;
}

export function Subtitle({ element = "span", children }: SubtitleProps) {
  switch (element) {
    case "h2":
      return (
        <h2 className="text-sm text-end text-muted-foreground font-medium">
          {children}
        </h2>
      );
    default:
      return (
        <span className="text-sm block text-end text-muted-foreground font-medium">
          {children}
        </span>
      );
  }
}
