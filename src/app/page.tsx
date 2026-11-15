import { auth0 } from "@/lib/auth0";
import { listAllQuotes } from "@/repositories/quotes";
import type { QuoteView } from "@/type";

import HomePageClient from "./HomePageClient";

function shuffleQuotes<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

export default async function Home() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;
  const quotes = await listAllQuotes();

  const quoteViews: QuoteView[] = quotes.map((quote) => ({
    id: quote.id,
    quote: quote.quote,
    author: quote.author,
    category: quote.category,
    tags: quote.tags ?? [],
    likeCount: quote.likedBy.length,
    isLiked: Boolean(userId && quote.likedBy.includes(userId)),
    isOwner: Boolean(userId && quote.createdBy === userId),
  }));

  return <HomePageClient quotes={shuffleQuotes(quoteViews)} />;
}
