import crypto from "crypto";
import { addMinutes, isAfter } from "date-fns";
import { prisma } from "@/lib/prisma";
import { sendMagicCodeEmail, sendWelcomeEmail } from "@/lib/email";

export function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function createLoginCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function issueLoginCode(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const code = createLoginCode();

  await prisma.loginCode.create({
    data: {
      email: normalizedEmail,
      codeHash: hashCode(code),
      expiresAt: addMinutes(new Date(), 15),
    },
  });

  const result = await sendMagicCodeEmail(normalizedEmail, code);
  return { code, sent: result.delivered };
}

export async function verifyLoginCode(email: string, code: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const record = await prisma.loginCode.findFirst({
    where: {
      email: normalizedEmail,
      usedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!record) {
    return null;
  }

  if (isAfter(new Date(), record.expiresAt)) {
    return null;
  }

  if (record.codeHash !== hashCode(code)) {
    return null;
  }

  await prisma.loginCode.update({
    where: { id: record.id },
    data: { usedAt: new Date() },
  });

  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  const isNewUser = !user;

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        emailVerified: new Date(),
      },
    });
  } else if (!user.emailVerified) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
  }

  if (isNewUser) {
    await sendWelcomeEmail(normalizedEmail);
  }

  return user;
}
