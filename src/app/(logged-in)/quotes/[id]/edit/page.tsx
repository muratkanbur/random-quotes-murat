import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import EditQuoteForm from "./EditQuoteForm";

interface EditQuotePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditQuotePage({ params }: EditQuotePageProps) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  return <EditQuoteForm id={id} currentUserId={session.user.sub} />;
}
