"use server";

import { quoteSchema} from "@/type";

export interface EditQuoteFormState {
  success: boolean;
  data?: {
    quote: string;
    author: string;
  };
  errors?: {
    fieldErrors: {
      quote?: string[];
      author?: string[];
    };
  };
  message?: string;
}

export async function handleEditQuote (_previousState: EditQuoteFormState,
  formData: FormData) : Promise<EditQuoteFormState> {
    const rawData = {
    quote: formData.get("quote") ?? "",
    author: formData.get("author") ?? "",
  };
const result = quoteSchema.safeParse(rawData);
 if (!result.success) {
    const errors = result.error.flatten();
    return {
      success: false,
      data: {
        quote: String(rawData.quote),
        author: String(rawData.author),
      },
      errors: { fieldErrors: errors.fieldErrors },
    };
  }
return {
    success: true,
    data: result.data,
    message: "Quote updated successfully",
  };

  }