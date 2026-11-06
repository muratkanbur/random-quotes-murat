"use client";

import { useQuotes } from "@/app/context/QuoteContext";
import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { LikeButton } from "@/components/LikeButton";
import { Card } from "@/components/Card";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function LikedQuotesPage() {
  const { quotes, toggleLikeQuote } = useQuotes();
  const { user } = useUser();

  const likedQuotes = quotes.filter(
    (quote) => user?.sub && quote.likedBy?.includes(user.sub),
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background text-foreground p-4 gap-4">
      {likedQuotes.length === 0 ? (
        <p className="text-muted-foreground font-semibold">
          There are no liked quotes yet.
        </p>
      ) : (
        likedQuotes.map((quote) => (
          <Card isLiked={true} key={quote.id}>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <LikeButton
                isLiked={true}
                handleClick={() =>
                  user?.sub && toggleLikeQuote(quote.id, user.sub)
                }
              />
            </div>

            <div className="flex-1 flex flex-col justify-center pt-6 pb-2 px-2">
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
