"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="secondary"
      className="w-full"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await signOut({ callbackUrl: "/" });
        });
      }}
    >
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
