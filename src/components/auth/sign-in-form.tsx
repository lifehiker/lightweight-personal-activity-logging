"use client";

import { useActionState, useState } from "react";
import { signIn } from "next-auth/react";
import { requestLoginCodeAction, verifyLoginCodeAction } from "@/app/signin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const initialState = {
  error: "",
  message: "",
  devCode: "",
  email: "",
};

export function SignInForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [email, setEmail] = useState("");
  const [requestState, requestAction, pendingRequest] = useActionState(
    requestLoginCodeAction,
    initialState,
  );
  const [verifyState, verifyAction, pendingSignIn] = useActionState(
    verifyLoginCodeAction,
    { error: "" },
  );

  return (
    <div className="panel max-w-xl p-8">
      <div className="space-y-3">
        <Badge>Passwordless sign-in</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Start logging in two steps.</h1>
        <p className="pretty text-[var(--muted)]">
          Enter your email, request a one-time code, then sign in. Google is optional when credentials are configured.
        </p>
      </div>

      <form action={requestAction} className="mt-8 space-y-3">
        <label className="block text-sm font-semibold">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" disabled={pendingRequest}>
          {pendingRequest ? "Sending..." : "Send sign-in code"}
        </Button>
        {requestState.message ? <p className="text-sm text-[var(--accent)]">{requestState.message}</p> : null}
        {requestState.error ? <p className="text-sm text-[#7f1d1d]">{requestState.error}</p> : null}
        {requestState.devCode ? (
          <p className="rounded-lg bg-[var(--brand-soft)] p-3 text-sm text-[var(--brand-deep)]">
            Email credentials are not configured. Use code <strong>{requestState.devCode}</strong> for local sign-in.
          </p>
        ) : null}
      </form>

      <form
        className="mt-8 space-y-3 border-t border-[var(--line)] pt-6"
        action={verifyAction}
      >
        <input type="hidden" name="email" value={requestState.email || email} />
        <label className="block text-sm font-semibold">6-digit code</label>
        <Input
          name="code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          placeholder="123456"
          required
        />
        <Button type="submit" disabled={pendingSignIn}>
          {pendingSignIn ? "Signing in..." : "Sign in"}
        </Button>
        {verifyState.error ? <p className="text-sm text-[#7f1d1d]">{verifyState.error}</p> : null}
      </form>

      <div className="mt-8 border-t border-[var(--line)] pt-6">
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={!googleEnabled}
          onClick={() => signIn("google", { callbackUrl: "/app" })}
        >
          {googleEnabled ? "Continue with Google" : "Google sign-in needs credentials"}
        </Button>
      </div>
    </div>
  );
}
