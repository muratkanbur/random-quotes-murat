"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { quotes as initialQuotes } from "@/app/quotes";

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  likedBy: string[];
  likesCount: number;
}

interface QuoteContextType {
  quotes: QuoteItem[];
  setQuotes: React.Dispatch<React.SetStateAction<QuoteItem[]>>;
  toggleLikeQuote: (quoteId: string) => void;
  incrementLike: (quoteId: string) => void;
  resetLike: (quoteId: string) => void;
}

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<QuoteItem[]>(() =>
    initialQuotes.map(
      (quote, index): QuoteItem => ({
        ...quote,
        id: String(index + 1),
        likesCount: 0,
        likedBy: quote.likedBy as string[],
      }),
    ),
  );
  const userId = "user_123";

  const toggleLikeQuote = (quoteId: string) => {
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

  const incrementLike = (quoteId: string) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => {
        if (quote.id !== quoteId) return quote;
        return { ...quote, likesCount: quote.likesCount + 1 };
      }),
    );
  };

  const resetLike = (quoteId: string) => {
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
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuotes must be used within the QuoteProvider wrapper.");
  }

  return context;
}
