"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  handleDeleteQuote,
  handleEditQuote,
  EditQuoteFormState,
  DeleteQuoteActionState,
} from "./action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { quoteCategories, Quote } from "@/type";

interface EditQuoteFormProps {
  id: string;
  currentUserId: string;
  quote: Quote;
}

export default function EditQuoteForm({
  id,
  currentUserId,
  quote,
}: EditQuoteFormProps) {
  const router = useRouter();

  const initialState: EditQuoteFormState = {
    success: false,
    data: {
      quote: quote?.quote || "",
      author: quote?.author || "",
      category: quote?.category || "",
      tags: quote?.tags?.join(", ") || "",
    },
  };

  const [state, dispatchAction, isPending] = useActionState<
    EditQuoteFormState,
    FormData
  >(handleEditQuote, initialState);

  const [deleteState, deleteAction, isDeleting] = useActionState<
    DeleteQuoteActionState,
    FormData
  >(handleDeleteQuote, { success: false });

  useEffect(() => {
    if (state.success || deleteState.success) {
      router.push("/");
    }
  }, [state.success, deleteState.success, router]);

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

  if (quote.createdBy !== currentUserId) {
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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 sm:px-0">
      {" "}
      <form className="w-full flex flex-col gap-6" action={dispatchAction}>
        <input type="hidden" name="quoteId" value={id} />
        <h1 className="text-2xl font-bold">Edit Quote</h1>
        <Field>
          <FieldLabel htmlFor="editQuote">Quote</FieldLabel>
          <Input
            id="editQuote"
            type="text"
            autoComplete="off"
            name="quote"
            defaultValue={state.data?.quote || quote.quote}
            aria-invalid={!!state.errors?.fieldErrors?.quote?.length}
          />{" "}
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

        <Field>
          <FieldLabel htmlFor="editCategory">Category</FieldLabel>
          <select
            id="editCategory"
            name="category"
            defaultValue={state.data?.category ?? quote.category ?? ""}
            aria-invalid={!!state.errors?.fieldErrors?.category?.length}
            className="h-9 w-full rounded-md border border-input bg-background px-3"
          >
            <option value="">Select a category</option>
            {quoteCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {state.errors?.fieldErrors?.category && (
            <FieldError>
              {state.errors.fieldErrors.category.join(" ")}
            </FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="editTags">Tags</FieldLabel>
          <Input
            id="editTags"
            type="text"
            name="tags"
            placeholder="success, motivation, life"
            defaultValue={state.data?.tags ?? quote.tags?.join(", ") ?? ""}
            aria-invalid={!!state.errors?.fieldErrors?.tags?.length}
          />{" "}
          {state.errors?.fieldErrors?.tags && (
            <FieldError>{state.errors.fieldErrors.tags.join(" ")}</FieldError>
          )}
        </Field>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Quote"}
        </Button>
      </form>
      <form
        action={deleteAction}
        onSubmit={(event) => {
          if (
            !window.confirm("Bu alıntıyı silmek istediğinizden emin misiniz?")
          ) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="quoteId" value={id} />

        <Button
          className="w-full"
          variant="destructive"
          type="submit"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Quote"}
        </Button>

        {deleteState.message && !deleteState.success && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {deleteState.message}
          </p>
        )}
      </form>
    </div>
  );
}
