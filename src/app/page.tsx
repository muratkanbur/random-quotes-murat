"use client";

import { QuoteText } from "@/components/typography/QuoteText";
import { Subtitle } from "@/components/typography/Subtitle";
import { Button } from "@/components/Button";
import { useState } from "react";
import { LikeButton } from "@/components/LikeButton";
import { Card } from "@/components/Card";
import { useQuotes } from "@/app/context/QuoteContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { quoteCategories } from "@/type";

export default function Home() {
  const { quotes, toggleLikeQuote } = useQuotes();
  const [index, setIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useUser();
  const filteredQuotes =
    selectedCategory === "All"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  if (!quotes || quotes.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-slate-100/80 dark:bg-background text-foreground p-4">
        <p className="text-muted-foreground font-medium">Loading quotes...</p>
      </main>
    );
  }

  if (filteredQuotes.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 p-4">
        <label htmlFor="emptyCategoryFilter">Category</label>
        <select
          id="emptyCategoryFilter"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setIndex(0);
          }}
          className="rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="All">All Categories</option>
          {quoteCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <p className="text-muted-foreground">
          There are no quotes in this category yet.
        </p>
      </main>
    );
  }

  const currentQuote = filteredQuotes[index % filteredQuotes.length];
  const isLiked = Boolean(
    user?.sub && currentQuote?.likedBy?.includes(user.sub),
  );

  const isOwner = Boolean(
    user?.sub && currentQuote?.createdBy && currentQuote.createdBy === user.sub,
  );
  function handleClick() {
    setIndex((prevIndex) => (prevIndex + 1) % filteredQuotes.length);
  }

  function handlePrevClick() {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredQuotes.length) % filteredQuotes.length,
    );
  }

  function handleLike() {
    if (!user || !user.sub) {
      alert("You need to be logged in to like a quote.");
      return;
    }

    if (currentQuote?.id) {
      toggleLikeQuote(currentQuote.id, user.sub);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background text-foreground p-4">
      <label className="mb-4 flex items-center gap-2">
        Category
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setIndex(0);
          }}
          className="rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="All">All Categories</option>
          {quoteCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <Card isLiked={isLiked} key={currentQuote?.id || index}>
        {isOwner && (
          <div className="absolute top-4 left-4">
            <Link
              href={`/quotes/${currentQuote.id}/edit`}
              className="text-xs px-2.5 py-1.5 rounded-md border border-input bg-background/80 hover:bg-accent hover:text-accent-foreground font-medium shadow-sm transition-colors"
            >
              Edit Quote
            </Link>
          </div>
        )}

        <div className="absolute top-4 right-4">
          <LikeButton isLiked={isLiked} handleClick={handleLike} />
        </div>
        <div
          aria-live="polite"
          className="flex-1 flex flex-col justify-center pt-8 pb-2 px-2"
        >
          <div className={isLiked ? "italic transition-all duration-300" : ""}>
            <QuoteText>{currentQuote?.quote}</QuoteText>
          </div>
          <Subtitle>{currentQuote?.author}</Subtitle>

          {currentQuote?.category && (
            <span className="mt-3 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {currentQuote.category}
            </span>
          )}

          {!!currentQuote?.tags?.length && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {currentQuote.tags.map((tag) => (
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
