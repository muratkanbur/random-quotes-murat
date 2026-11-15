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
    .optional()
    .refine(
      (value) =>
        !value ||
        value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean).length <= 5,
      { message: "You can add up to 5 tags." },
    )
    .refine(
      (value) =>
        !value ||
        value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .every((tag) => tag.length <= 20),
      { message: "Each tag must be 20 characters or fewer." },
    ),
});
