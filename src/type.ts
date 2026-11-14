import z from "zod";

export interface InitialQuote {
  quote: string;
  author: string;
}

export type QuoteId = string;
export type UserId = string;

export interface Quote extends InitialQuote {
  id: QuoteId;
  likedBy: UserId[];
  createdBy?: UserId;
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags?: string[];
}

export interface NewQuoteFormState {
  success: boolean;
  data?: {
    quote: string;
    author: string;
    category?: string;
    tags?: string;
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
  createdQuote?: Quote;
}

export const quoteCategories = [
  "Motivation",
  "Life",
  "Love",
  "Wisdom",
  "Humor",
  "Success",
  "Philosophy",
] as const;

export const quoteSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(3, { message: "Quote should be at least 3 characters long." })
    .max(500, { message: "Quote should be at most 500 characters long." }),
  author: z
    .string()
    .trim()
    .min(1, { message: "Author should be at least 1 characters long." })
    .max(50, { message: "Author name should be at most 50 characters long." }),
  category: z.enum(quoteCategories, {
    message: "Please select a valid category.",
  }),
  tags: z
    .string()
    .trim()
    .max(20, { message: "Tag should be at most 20 characters long." })
    .optional(),
});
