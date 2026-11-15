"use client";

import { useState } from "react";
import type { QuoteView } from "@/type";
import { Card } from "@/components/Card";
import { LikeButton } from "@/components/LikeButton";
import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { toggleQuoteLike } from "@/app/action";

export default function LikedQuotesClient({
  initialQuotes,
}: {
  initialQuotes: QuoteView[];
}) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [updatingQuoteId, setUpdatingQuoteId] = useState<string | null>(null);

  async function handleUnlike(quoteId: string) {
    if (updatingQuoteId) return;

    setUpdatingQuoteId(quoteId);

    try {
      const result = await toggleQuoteLike(quoteId);

      if (!result.success) {
        alert(result.message);
        return;
      }

      setQuotes((current) =>
        current.filter((quote) => quote.id !== quoteId || result.isLiked),
      );
    } catch (error) {
      console.error("Could not update liked quote", error);
      alert("Could not update the like. Please try again.");
    } finally {
      setUpdatingQuoteId(null);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background text-foreground p-4 gap-4">
      {quotes.length === 0 ? (
        <p className="text-muted-foreground font-semibold">
          There are no liked quotes yet.
        </p>
      ) : (
        quotes.map((quote) => (
          <Card isLiked={quote.isLiked} key={quote.id}>
            <div className="absolute top-4 right-4">
              <LikeButton
                isLiked={true}
                handleClick={() => handleUnlike(quote.id)}
                likeCount={quote.likeCount}
              />
            </div>

            <div className="flex-1 flex flex-col justify-center pt-6 pb-2 px-2">
              <div className="italic transition-all duration-300">
                <QuoteText>{quote.quote}</QuoteText>
              </div>
              <Subtitle>{quote.author}</Subtitle>

              {quote.category && (
                <span className="mt-3 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {quote.category}
                </span>
              )}

              {!!quote.tags?.length && (
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {quote.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))
      )}
    </main>
  );
}
