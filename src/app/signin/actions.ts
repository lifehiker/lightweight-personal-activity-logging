"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { issueLoginCode } from "@/lib/auth-helpers";
import { signIn } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export async function requestLoginCodeAction(
  _previousState: { error: string; message: string; devCode: string; email: string },
  formData: FormData,
) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      error: "Enter a valid email address.",
      message: "",
      devCode: "",
      email: "",
    };
  }

  const { code, sent } = await issueLoginCode(parsed.data.email);

  return {
    error: "",
    message: sent
      ? "Check your inbox for the sign-in code."
      : "Email delivery is not configured, so a local development code is shown below.",
    devCode: sent ? "" : code,
    email: parsed.data.email,
  };
}

export async function verifyLoginCodeAction(
  _previousState: { error: string },
  formData: FormData,
) {
  const parsed = verifySchema.safeParse({
    email: formData.get("email"),
    code: formData.get("code"),
  });

  if (!parsed.success) {
    return { error: "Enter the email and 6-digit code from your latest sign-in request." };
  }

  const result = await signIn("credentials", {
    email: parsed.data.email,
    code: parsed.data.code,
    redirect: false,
    redirectTo: "/app",
  });

  if (typeof result === "string" && result.includes("error=")) {
    return { error: "That code did not match the latest sign-in request." };
  }

  redirect("/app");
}
