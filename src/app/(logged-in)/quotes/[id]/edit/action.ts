"use server";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import {
  deleteQuoteById,
  getQuoteById,
  updateQuoteById,
} from "@/repositories/quotes";
import { quoteSchema } from "@/type";

export interface EditQuoteFormState {
  success: boolean;
  data?: {
    quote: string;
    author: string;
    category: string;
    tags: string;
  };
  errors?: {
    fieldErrors: {
      quote?: string[];
      author?: string[];
      category?: string[];
      tags?: string[];
    };
  };
  message?: string;
}

export async function handleEditQuote(
  _previousState: EditQuoteFormState,
  formData: FormData,
): Promise<EditQuoteFormState> {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    redirect("/auth/login");
  }

  const quoteId = formData.get("quoteId");

  if (typeof quoteId !== "string" || !quoteId) {
    return { success: false, message: "Invalid quote ID." };
  }
  const existingQuote = await getQuoteById(quoteId);
  if (!existingQuote) {
    return { success: false, message: "Quote not found." };
  }
  if (existingQuote.createdBy !== session.user.sub) {
    return {
      success: false,
      message: "You are not allowed to edit this quote.",
    };
  }

  const rawData = {
    quote: formData.get("quote") ?? "",
    author: formData.get("author") ?? "",
    category: formData.get("category") ?? "",
    tags: formData.get("tags") ?? "",
  };
  const result = quoteSchema.safeParse(rawData);
  if (!result.success) {
    const errors = result.error.flatten();
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

  const tags = result.data.tags
    ? result.data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const updatedQuote = await updateQuoteById(quoteId, {
    quote: result.data.quote,
    author: result.data.author,
    category: result.data.category,
    tags,
  });

  if (!updatedQuote) {
    return { success: false, message: "Could not update the quote." };
  }

  return {
    success: true,
    data: {
      quote: result.data.quote,
      author: result.data.author,
      category: result.data.category,
      tags: result.data.tags ?? "",
    },
    message: "Quote updated successfully",
  };
}

export interface DeleteQuoteActionState {
  success: boolean;
  message?: string;
}

export async function handleDeleteQuote(
  _previousState: DeleteQuoteActionState,
  formData: FormData,
): Promise<DeleteQuoteActionState> {
  const session = await auth0.getSession();

  if (!session?.user?.sub) {
    redirect("/auth/login");
  }

  const quoteId = formData.get("quoteId");

  if (typeof quoteId !== "string" || !quoteId) {
    return { success: false, message: "Invalid quote ID." };
  }

  const quote = await getQuoteById(quoteId);

  if (!quote) {
    return { success: false, message: "Quote not found." };
  }

  if (quote.createdBy !== session.user.sub) {
    return {
      success: false,
      message: "You are not allowed to delete this quote.",
    };
  }

  const deleted = await deleteQuoteById(quoteId);

  if (!deleted) {
    return { success: false, message: "Could not delete the quote." };
  }

  return { success: true };
}
