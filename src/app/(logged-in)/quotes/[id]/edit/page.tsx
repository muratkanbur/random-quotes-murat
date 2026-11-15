import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import EditQuoteForm from "./EditQuoteForm";
import { getQuoteById } from "@/repositories/quotes";

interface EditQuotePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditQuotePage({ params }: EditQuotePageProps) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { id } = await params;

  const quote = await getQuoteById(id);

  if (!quote) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">Quote not found.</div>
    );
  }

  if (quote.createdBy !== session.user.sub) {
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
    <EditQuoteForm
      id={quote.id}
      quote={{
        quote: quote.quote,
        author: quote.author,
        category: quote.category,
        tags: quote.tags ?? [],
      }}
    />
  );
}
