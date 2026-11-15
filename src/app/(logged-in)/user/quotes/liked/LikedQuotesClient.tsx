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
  const [likeError, setLikeError] = useState<string | null>(null);

  async function handleUnlike(quoteId: string) {
    if (updatingQuoteId) return;
    setLikeError(null);
    setUpdatingQuoteId(quoteId);

    try {
      const result = await toggleQuoteLike(quoteId);

      if (!result.success) {
        setLikeError(result.message);
        return;
      }
      setQuotes((current) =>
        current.filter((quote) => quote.id !== quoteId || result.isLiked),
      );
    } catch (error) {
      console.error("Could not update liked quote", error);
      setLikeError("Could not update the like. Please try again.");
    } finally {
      setUpdatingQuoteId(null);
    }
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background p-4 text-foreground">
      {likeError && (
        <p
          role="alert"
          className="mx-auto mb-4 max-w-6xl text-sm text-destructive"
        >
          {likeError}
        </p>
      )}
      {quotes.length === 0 ? (
        <p className="pt-8 text-center font-semibold text-muted-foreground">
          There are no liked quotes yet.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quotes.map((quote) => (
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
          ))}
        </div>
      )}
    </main>
  );
}
