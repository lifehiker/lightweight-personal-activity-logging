"use server";

import { z } from "zod";
import { issueLoginCode } from "@/lib/auth-helpers";

const schema = z.object({
  email: z.string().email(),
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
