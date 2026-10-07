export function QuoteText({ children, className = "" }) {
  return (
    <p
      className={`text-card-foreground text-lg sm:text-xl font-medium ${className}`}
    >
      {" "}
      {children}{" "}
    </p>
  );
}
