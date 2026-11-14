'use server';

import { auth0 } from "@/lib/auth0";
import { listAllQuotes, updateQuoteLikedBy } from "@/repositories/quotes";

export async function getQuotes(){
return await listAllQuotes();
  
}

export async function toggleQuoteLike (quoteId: string) {
  const session = await auth0.getSession();
  const userId = session?.user.sub;

  if(!userId) {
    return {
      success: false as const,
      message: "Please log in to like a quote"
    }
  }

  const updatedQuote = await updateQuoteLikedBy(quoteId, userId);

  if(!updatedQuote){
    return {
      success: false as const,
      message: "Quote not found",
    }
  }

  return {
    success: true as const,
    likedBy: updatedQuote.likedBy,
  }
}