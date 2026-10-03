"use client";

import { useQuotes } from "@/app/context/QuoteContext";
import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { LikeButton } from "@/components/LikeButton";
import { Card } from "@/components/Card";

export default function LikedQuotesPage() {
  const { quotes, toggleLikeQuote } = useQuotes();
  const userId = "user_123";

  const LikedQuotes = quotes.filter((quote) => quote.likedBy?.includes(userId));

  return (
    <main className="flex flex-col items-center justify-center min-h-screen   bg-emerald-100 p-4">
      {LikedQuotes.length === 0 ? (
        <p className="text-emerald-900 font-semibold">
          Henüz beğenilen söz yok.
        </p>
      ) : (
        LikedQuotes.map((quote) => (
          <Card isLiked={true} key={quote.id}>
            <div className="absolute top-4 right-4">
              <LikeButton
                isLiked={true}
                handleClick={() => toggleLikeQuote(quote.id)}
              />
            </div>

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
