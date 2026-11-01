interface LikeButtonProps {
  handleClick: () => void;
  isLiked?: boolean;
}

export function LikeButton({ handleClick, isLiked = false }: LikeButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 text-white bg-black/20 hover:bg-black/30 px-3 py-1 rounded-full transition-all"
    >
      <span>{isLiked ? "❤️" : "🤍"}</span>
    </button>
  );
}
