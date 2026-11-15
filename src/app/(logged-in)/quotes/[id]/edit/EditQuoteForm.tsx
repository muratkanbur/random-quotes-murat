"use client";

import { useActionState, useEffect, useRef } from "react";
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
import { quoteCategories, QuoteView } from "@/type";

interface EditQuoteFormProps {
  id: string;
  quote: Pick<QuoteView, "quote" | "author" | "category" | "tags">;
}
export default function EditQuoteForm({ id, quote }: EditQuoteFormProps) {
  const router = useRouter();
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

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
      <div>
        <Button
          className="w-full"
          variant="destructive"
          type="button"
          onClick={() => deleteDialogRef.current?.showModal()}
        >
          Delete Quote
        </Button>

        <dialog
          ref={deleteDialogRef}
          aria-labelledby="delete-dialog-title"
          className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-xl backdrop:bg-black/50"
        >
          <h2 id="delete-dialog-title" className="mb-2 text-lg font-semibold">
            Delete this quote?
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            This action cannot be undone.
          </p>

          <form action={deleteAction}>
            <input type="hidden" name="quoteId" value={id} />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => deleteDialogRef.current?.close()}
              >
                Cancel
              </Button>

              <Button variant="destructive" type="submit" disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Quote"}
              </Button>
            </div>

            {deleteState.message && !deleteState.success && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {deleteState.message}
              </p>
            )}
          </form>
        </dialog>
      </div>{" "}
    </div>
  );
}
