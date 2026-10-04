export function LikeButton({ handleClick, likesCount = 0 }) {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 text-white bg-black/20 hover:bg-black/30 px-3 py-1 rounded-full transition-all"
    >
      <span>{likesCount > 0 ? "❤️" : "🤍"}</span>
      <span className="text-sm font-semibold">{likesCount}</span>
    </button>
  );
}
