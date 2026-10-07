"use client";

import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { Button } from "@/components/Button";
import { useState } from "react";
import { LikeButton } from "@/components/LikeButton";
import { Card } from "@/components/Card";
import { useQuotes } from "@/app/context/QuoteContext";

export default function Home() {
  const { quotes, incrementLike } = useQuotes();
  const [index, setIndex] = useState(0);

  if (!quotes || quotes.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-slate-100/80 dark:bg-background text-foreground p-4">
        <p className="text-muted-foreground font-medium">Loading quotes...</p>
      </main>
    );
  }

  const currentQuote = quotes[index];
  const isLiked = (currentQuote?.likesCount || 0) > 0;

  function handleClick() {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  }

  function handlePrevClick() {
    setIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background text-foreground p-4">
      <Card isLiked={isLiked} key={currentQuote?.id || index}>
        <div className="absolute top-4 right-4">
          <LikeButton
            likesCount={currentQuote?.likesCount || 0}
            handleClick={() => incrementLike(currentQuote?.id)}
          />
        </div>
        <div
          aria-live="polite"
          className="flex-1 flex flex-col justify-center pt-8 pb-2 px-2"
        >
          <div className={isLiked ? "italic transition-all duration-300" : ""}>
            <QuoteText>{currentQuote?.quote}</QuoteText>
          </div>
          <Subtitle>{currentQuote?.author}</Subtitle>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            title="Previous quote"
            aria-label="Previous quote"
            handleClick={handlePrevClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-colors"
          />
          <Button
            title="Next quote"
            aria-label="Next quote"
            handleClick={handleClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-colors"
          />
        </div>
      </Card>
    </main>
  );
}
