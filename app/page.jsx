"use client";

import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { Button } from "@/components/Button";
import { useState } from "react";
import { LikeButton } from "@/components/LikeButton";
import { Card } from "@/components/Card";
import { useQuotes } from "@/app/context/QuoteContext";

export default function Home() {
  const { quotes, toggleLikeQuote } = useQuotes();
  const [index, setIndex] = useState(0);
  const userId = "user_123";
  const isLiked = quotes[index]?.likedBy?.includes(userId);

  function handleClick() {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  }

  function handlePrevClick() {
    setIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-emerald-100 p-4">
      <Card isLiked={isLiked} key={quotes[index].id || index}>
        <div className="absolute top-4 right-4">
          <LikeButton
            isLiked={isLiked}
            handleClick={() => toggleLikeQuote(quotes[index].id)}
          />
        </div>

        <div className="flex-1 flex flex-col justify-center pt-8 pb-2 px-2">
          <div className={isLiked ? "italic transition-all duration-300" : ""}>
            <QuoteText>{quotes[index].quote}</QuoteText>
          </div>
          <Subtitle>{quotes[index].author}</Subtitle>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            title="Previous quote"
            handleClick={handlePrevClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50"
          />
          <Button
            title="Next quote"
            handleClick={handleClick}
            className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50"
          />
        </div>
      </Card>
    </main>
  );
}
