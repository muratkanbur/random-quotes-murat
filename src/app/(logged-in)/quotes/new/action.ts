"use server";

import { NewQuoteFormState, quoteSchema } from "@/type";
import z from "zod";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { insertQuote } from "@/repositories/quotes";

export async function handleNewQuote(
  _previousState: NewQuoteFormState,
  formData: FormData,
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const rawData = {
    quote: formData.get("quote") ?? "",
    author: formData.get("author") ?? "",
    category: formData.get("category") ?? "",
    tags: formData.get("tags") ?? "",
  };

  const result = quoteSchema.safeParse(rawData);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      data: {
        quote: String(rawData.quote),
        author: String(rawData.author),
        category: String(rawData.category),
        tags: String(rawData.tags),
      },
      errors: { fieldErrors: errors.fieldErrors },
    };
  }

  const savedQuote = await insertQuote({
    quote: result.data.quote,
    author: result.data.author,
    createdBy: session.user.sub,
    category: result.data.category,
    tags: result.data.tags
      ? result.data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
  });

  return {
    success: true,
    message: "Quote added successfully",
    createdQuote: savedQuote,
  };
}
