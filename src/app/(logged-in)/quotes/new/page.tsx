"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useRef } from "react";
import { handleNewQuote } from "./action";
import { useRouter } from "next/navigation";
import { NewQuoteFormState, quoteSchema, quoteCategories } from "@/type";
import { useQuotes } from "@/app/context/QuoteContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialState = {
  success: false,
  data: {
    quote: "",
    author: "",
    category: "",
    tags: "",
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

  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(quoteSchema) });

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
          aria-invalid={
            !!state.errors?.fieldErrors?.quote?.join("") ||
            !!errors.quote?.message
          }
          defaultValue={state.data?.quote ?? ""}
          {...register("quote")}
        />

        {!!errors.quote?.message ? (
          <FieldError>{errors.quote?.message.toString()}</FieldError>
        ) : (
          <></>
        )}

        {!errors.quote?.message &&
        !!state.errors?.fieldErrors?.quote?.join(" ") ? (
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
          aria-invalid={
            !!state.errors?.fieldErrors?.author?.join("") ||
            !!errors.author?.message
          }
          defaultValue={state.data?.author ?? ""}
          {...register("author")}
        />

        {!!errors.author?.message ? (
          <FieldError>{errors.author?.message.toString()}</FieldError>
        ) : (
          <></>
        )}
        {!errors.author?.message &&
        !!state.errors?.fieldErrors?.author?.join(" ") ? (
          <FieldError>
            {state.errors?.fieldErrors?.author?.join(" ")}
          </FieldError>
        ) : (
          <></>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="newCategory">Category</FieldLabel>
        <select
          id="newCategory"
          aria-invalid={
            !!state.errors?.fieldErrors?.category?.length ||
            !!errors.category?.message
          }
          defaultValue={state.data?.category ?? ""}
          {...register("category")}
        >
          <option value="">Select a category</option>
          {quoteCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category?.message ? (
          <FieldError>{errors.category.message}</FieldError>
        ) : state.errors?.fieldErrors?.category?.length ? (
          <FieldError>
            {state.errors?.fieldErrors?.category?.join(" ")}
          </FieldError>
        ) : (
          <></>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="newTags">Add Tags</FieldLabel>
        <Input
          id="newTags"
          type="text"
          autoComplete="off"
          placeholder="success, mindset, discipline"
          aria-invalid={
            !!state.errors?.fieldErrors?.tags?.join("") ||
            !!errors.tags?.message
          }
          defaultValue={state.data?.tags ?? ""}
          {...register("tags")}
        />

        {errors.tags?.message ? (
          <FieldError>{errors.tags?.message}</FieldError>
        ) : state.errors?.fieldErrors?.tags?.length ? (
          <FieldError> {state.errors.fieldErrors.tags.join(" ")} </FieldError>
        ) : null}
      </Field>

      <Button className={"w-full"} type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
