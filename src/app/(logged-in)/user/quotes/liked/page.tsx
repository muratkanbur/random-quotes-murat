import { auth0 } from "@/lib/auth0";
import { listFavouriteQuotes } from "@/repositories/quotes";
import LikedQuotesClient from "./LikedQuotesClient";
import type { QuoteView } from "@/type";

export default async function LikedQuotesPage() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return (
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <p>Please log in to see your liked quotes.</p>
      </main>
    );
  }

  const quotes = await listFavouriteQuotes(userId);
  const quoteViews: QuoteView[] = quotes.map((quote) => ({
    id: quote.id,
    quote: quote.quote,
    author: quote.author,
    category: quote.category,
    tags: quote.tags ?? [],
    likeCount: quote.likedBy.length,
    isLiked: true,
    isOwner: quote.createdBy === userId,
  }));

  return <LikedQuotesClient initialQuotes={quoteViews} />;
}
