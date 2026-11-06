"use server";

import { NewQuoteFormState, quoteSchema } from "@/type";
import z from "zod";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";




export async function handleNewQuote (_previousState: NewQuoteFormState,
  formData: FormData): Promise<NewQuoteFormState> {

    const session = await auth0.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const userId = session.user.sub;

  const rawData = {
    quote: formData.get("quote") ?? "",
    author: formData.get("author") ?? "",
  }

  const result = quoteSchema.safeParse(rawData);

  if(!result.success) {
    const errors = z.flattenError(result.error);
    console.table(errors);
    return {
      success: false,
      data: {
      quote: String(rawData.quote),
      author: String(rawData.author),
    },
    errors: {fieldErrors: errors.fieldErrors},
  }}

  const now = new Date().toISOString();
  const newQuote = {
    id: crypto.randomUUID(),
    quote: result.data.quote,
    author: result.data.author,
    createdBy: userId,
    likedBy: [],
    likesCount: 0,
    createdAt: now,
    updatedAt: now,
  }

  return {
    success: true,
    message: "Quote added successfully",
    createdQuote: newQuote,
  };
  
}