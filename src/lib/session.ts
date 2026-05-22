import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getRequiredSession() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  return session;
}
