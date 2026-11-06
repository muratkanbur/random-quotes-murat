"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuotes } from "@/app/context/QuoteContext";
import { handleEditQuote, EditQuoteFormState } from "./action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface EditQuoteFormProps {
  id: string;
  currentUserId: string;
}

export default function EditQuoteForm({
  id,
  currentUserId,
}: EditQuoteFormProps) {
  const router = useRouter();
  const { quotes, updateQuote } = useQuotes();

  const quote = quotes.find((quote) => quote.id === id);

  const initialState: EditQuoteFormState = {
    success: false,
    data: {
      quote: quote?.quote || "",
      author: quote?.author || "",
    },
  };

  const [state, dispatchAction, isPending] = useActionState<
    EditQuoteFormState,
    FormData
  >(handleEditQuote, initialState);

  useEffect(() => {
    if (state.success && state.data) {
      updateQuote(id, {
        quote: state.data.quote,
        author: state.data.author,
      });
      router.push("/");
    }
  }, [state.success, state.data, id, updateQuote, router]);

  if (!quote) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">No Quote Found</h2>
        <p className="mt-2 text-muted-foreground">
          The quote you wish to edit does not exist.
        </p>
      </div>
    );
  }

  if (quote.createdBy && quote.createdBy !== currentUserId) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center border border-red-200 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-neutral-700">
          Only the user who created this quote can edit it.
        </p>
      </div>
    );
  }

  return (
    <form
      className="max-w-3xl mx-auto flex flex-col gap-6"
      action={dispatchAction}
    >
      <h1 className="text-2xl font-bold">Edit Quote</h1>
      <Field>
        <FieldLabel htmlFor="editQuote">Quote</FieldLabel>
        <input
          id="editQuote"
          type="text"
          autoComplete="off"
          name="quote"
          defaultValue={state.data?.quote || quote.quote}
          aria-invalid={!!state.errors?.fieldErrors?.quote?.length}
        />
        {state.errors?.fieldErrors?.quote && (
          <FieldError>{state.errors.fieldErrors.quote.join(", ")}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="editAuthor">Author</FieldLabel>
        <Input
          id="editAuthor"
          type="text"
          autoComplete="off"
          name="author"
          defaultValue={state.data?.author || quote.author}
          aria-invalid={!!state.errors?.fieldErrors?.author?.length}
        />
        {state.errors?.fieldErrors?.author && (
          <FieldError>{state.errors.fieldErrors.author.join(" ")}</FieldError>
        )}
      </Field>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Quote"}
      </Button>
    </form>
  );
}
