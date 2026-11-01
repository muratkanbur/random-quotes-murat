import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const { user } = session;

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-background text-foreground p-4">
      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 flex flex-col items-center gap-5">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name || "User Avatar"}
            className="w-24 h-24 rounded-full border-2 border-primary/20 object-cover shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        )}

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {user.name || "Anonymous User"}
          </h1>
          {user.nickname && (
            <p className="text-sm text-muted-foreground">@{user.nickname}</p>
          )}
        </div>

        <div className="w-full space-y-3 pt-4 border-t text-sm">
          <div className="flex justify-between items-center py-1">
            <span className="text-muted-foreground font-medium">Email:</span>
            <span className="font-semibold">
              {user.email || "No email provided"}
            </span>
          </div>

          <div className="flex flex-col gap-1 py-1">
            <span className="text-muted-foreground font-medium">
              User ID (sub):
            </span>
            <span className="font-mono text-xs bg-muted p-2 rounded break-all border">
              {user.sub}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
