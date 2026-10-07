export const Card = ({ children, isLiked }) => {
  return (
    <div
      className={`relative text-center bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-md max-w-md w-full min-h-[230px] flex flex-col justify-between transition-all duration-300 ${
        isLiked
          ? "border-destructive/80 shadow-destructive/10"
          : "border-border shadow-sm"
      }`}
    >
      {children}
    </div>
  );
};
