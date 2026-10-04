"use client";

import { createContext, useContext, useState } from "react";
import { quotes as initialQuotes } from "@/app/quotes";

const QuoteContext = createContext(null);

export function QuoteProvider({ children }) {
  const [quotes, setQuotes] = useState(
    initialQuotes.map((quote, index) => ({
      id: String(index + 1),
      likesCount: 0,
      ...quote,
    })),
  );
  const userId = "user_123";

  const toggleLikeQuote = (quoteId) => {
    setQuotes((prevQuotes) => {
      return prevQuotes.map((quote) => {
        if (quote.id !== quoteId) {
          return quote;
        }

        const currentLikedBy = quote.likedBy || [];
        const isLiked = currentLikedBy.includes(userId);

        const updateLikedBy = isLiked
          ? currentLikedBy.filter((id) => id !== userId)
          : [...currentLikedBy, userId];

        return { ...quote, likedBy: updateLikedBy };
      });
    });
  };

  const incrementLike = (quoteId) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote.id !== quoteId) return quote;
        return { ...quote, likesCount: quote.likesCount + 1 };
      }),
    );
  };

  const resetLike = (quoteId) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote.id !== quoteId) return quote;
        return { ...quote, likesCount: 0 };
      }),
    );
  };

  return (
    <QuoteContext.Provider
      value={{ quotes, setQuotes, toggleLikeQuote, incrementLike, resetLike }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuotes() {
  return useContext(QuoteContext);
}
