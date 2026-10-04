"use client";

import { useQuotes } from "@/app/context/QuoteContext";
import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { LikeButton } from "@/components/LikeButton";
import { Card } from "@/components/Card";

export default function LikedQuotesPage() {
  const { quotes, incrementLike, resetLike } = useQuotes();

  const LikedQuotes = quotes.filter((quote) => (quote.likesCount || 0) > 0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen   bg-emerald-100 p-4">
      {LikedQuotes.length === 0 ? (
        <p className="text-emerald-900 font-semibold">
          There are no liked quotes yet.
        </p>
      ) : (
        LikedQuotes.map((quote) => (
          <Card isLiked={true} key={quote.id}>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <LikeButton
                likesCount={quote.likesCount || 0}
                handleClick={() => incrementLike(quote.id)}
              />
            </div>

            <button
              onClick={() => resetLike(quote.id)}
              className="p-1 hover:bg-black/20 rounded-full transition-colors
              text-sm"
              title="Remove from liked"
            >
              🗑️
            </button>

            <div className="flex-1 flex flex-col justify-center pt-8 pb-2 px-2">
              <div className="italic transition-all duration-300">
                <QuoteText>{quote.quote}</QuoteText>
              </div>
              <Subtitle>{quote.author}</Subtitle>
            </div>
          </Card>
        ))
      )}
    </main>
  );
}
