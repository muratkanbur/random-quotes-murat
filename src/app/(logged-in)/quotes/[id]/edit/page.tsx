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
    redirect("/login");
  }

  const { id } = await params;

  const quote = await getQuoteById(id);

  if (!quote) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">Quote not found.</div>
    );
  }

  return (
    <EditQuoteForm
      id={quote.id}
      currentUserId={session.user.sub}
      quote={quote}
    />
  );
}
