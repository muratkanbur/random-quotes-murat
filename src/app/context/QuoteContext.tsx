"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { quotes as initialQuotes } from "@/app/quotes";

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  likedBy: string[];
  likesCount: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface QuoteContextType {
  quotes: QuoteItem[];
  setQuotes: React.Dispatch<React.SetStateAction<QuoteItem[]>>;
  toggleLikeQuote: (quoteId: string, userId: string) => void;
  addQuote: (newQuote: QuoteItem) => void;
  updateQuote: (id: string, updated: { quote: string; author: string }) => void;
}

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<QuoteItem[]>(() =>
    initialQuotes.map(
      (quote, index): QuoteItem => ({
        ...quote,
        id: String(index + 1),
        likesCount: ((quote.likedBy as string[]) || []).length,
        likedBy: quote.likedBy as string[],
      }),
    ),
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedQuotes = localStorage.getItem("random_quotes_data");
    if (savedQuotes) {
      try {
        setQuotes(JSON.parse(savedQuotes));
      } catch (error) {
        console.error("Could not parse quotes from localStorage", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("random_quotes_data", JSON.stringify(quotes));
    }
  }, [quotes, isLoaded]);

  const toggleLikeQuote = (quoteId: string, userId: string) => {
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

        return {
          ...quote,
          likedBy: updateLikedBy,
          likesCount: updateLikedBy.length,
        };
      });
    });
  };

  const addQuote = (newQuote: QuoteItem) => {
    setQuotes((prev) => {
      if (prev.some((q) => q.id === newQuote.id)) {
        return prev;
      }
      return [newQuote, ...prev];
    });
  };

  const updateQuote = (
    id: string,
    updated: { quote: string; author: string },
  ) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id == id
          ? { ...q, ...updated, updateAt: new Date().toISOString() }
          : q,
      ),
    );
  };

  return (
    <QuoteContext.Provider
      value={{ quotes, setQuotes, toggleLikeQuote, addQuote, updateQuote }}
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
