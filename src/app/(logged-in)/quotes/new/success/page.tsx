import Link from "next/link";

export default function NewQuoteSuccess() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-bold">Thank you for adding your quote!</h1>
      <p className="text-muted-foreground">
        Your quote has been added successfully.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-2.5 font-medium transition-colors hover:bg-muted"
        >
          Back to home
        </Link>
        <Link
          href="/quotes/new"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-green-800 px-5 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-green-900"
        >
          Add another quote
        </Link>
      </div>
    </main>
  );
}
