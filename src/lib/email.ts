import { env, isResendConfigured } from "@/lib/env";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

async function sendEmail(payload: EmailPayload) {
  if (!isResendConfigured()) {
    console.log("Email fallback", payload);
    return { delivered: false, fallback: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(env.resendApiKey);
  await resend.emails.send({
    from: env.resendFrom,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  });

  return { delivered: true, fallback: false };
}

export async function sendMagicCodeEmail(email: string, code: string) {
  return sendEmail({
    to: email,
    subject: "Your ReadLog sign-in code",
    html: `<p>Your ReadLog sign-in code is <strong>${code}</strong>.</p><p>It expires in 15 minutes.</p>`,
  });
}

export async function sendWelcomeEmail(email: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to ReadLog",
    html: "<p>Welcome to ReadLog. Your private reading history starts here.</p>",
  });
}

export async function sendUpgradeConfirmationEmail(email: string) {
  return sendEmail({
    to: email,
    subject: "Your ReadLog Premium plan is active",
    html: "<p>Your Premium plan is active. Stats, export, and unlimited entries are now unlocked.</p>",
  });
}
