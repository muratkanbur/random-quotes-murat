"use server";

import { quoteSchema} from "@/type";

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

export async function handleEditQuote (_previousState: EditQuoteFormState,
  formData: FormData) : Promise<EditQuoteFormState> {
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