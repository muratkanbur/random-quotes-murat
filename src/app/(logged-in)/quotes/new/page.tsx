"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useRef } from "react";
import { handleNewQuote } from "./action";
import { redirect, useRouter } from "next/navigation";
import { NewQuoteFormState } from "@/type";
import { useQuotes } from "@/app/context/QuoteContext";

const initialState = {
  success: false,
  data: {
    quote: "",
    author: "",
  },
};

export default function NewQuotePage() {
  const router = useRouter();
  const { addQuote } = useQuotes();
  const hasAdded = useRef(false);
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(handleNewQuote, initialState);

  useEffect(() => {
    if (state.success && state.createdQuote && !hasAdded.current) {
      hasAdded.current = true;
      addQuote(state.createdQuote);
      router.push("/quotes/new/success");
    }
  }, [state.success, state.createdQuote, addQuote, router]);

  return (
    <form
      className="max-w-3xl mx-auto flex flex-col gap-6 "
      action={dispatchAction}
    >
      <Field>
        <FieldLabel htmlFor="newQuote">New Quote</FieldLabel>
        <Input
          id="newQuote"
          type="text"
          autoComplete="off"
          aria-invalid={!!state.errors?.fieldErrors?.quote?.join("")}
          name="quote"
          defaultValue={state.data?.quote ?? ""}
        />

        {!!state.errors?.fieldErrors?.quote?.join(" ") ? (
          <FieldError>{state.errors?.fieldErrors?.quote?.join(" ")}</FieldError>
        ) : (
          <></>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="newAuthor">New Author</FieldLabel>
        <Input
          id="newAuthor"
          type="text"
          autoComplete="off"
          aria-invalid={!!state.errors?.fieldErrors?.author?.join("")}
          name="author"
          defaultValue={state.data?.author ?? ""}
        />
        {!!state.errors?.fieldErrors?.author?.join(" ") ? (
          <FieldError>
            {state.errors?.fieldErrors?.author?.join(" ")}
          </FieldError>
        ) : (
          <></>
        )}
      </Field>
      <Button className={"w-full"} type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
