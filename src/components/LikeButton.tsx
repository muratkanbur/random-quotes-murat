interface LikeButtonProps {
  handleClick: () => void;
  isLiked?: boolean;
  likeCount: number;
}

export function LikeButton({
  handleClick,
  isLiked = false,
  likeCount,
}: LikeButtonProps) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 bg-green-800 text-white hover:bg-green-900 px-3 py-1 rounded-full transition-all"
    >
      <span>{isLiked ? "❤️" : "🤍"}</span>
      <span aria-label={`${likeCount} likes`}>{likeCount}</span>{" "}
    </button>
  );
}
