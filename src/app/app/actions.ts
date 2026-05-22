"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { ensureUserCanCreateEntry } from "@/lib/billing";
import { logEntrySchema } from "@/lib/log-schema";
import { normalizeTitle } from "@/lib/utils";

async function parseEntry(formData: FormData) {
  return logEntrySchema.parse({
    title: formData.get("title"),
    author: formData.get("author"),
    loggedAt: formData.get("loggedAt"),
    pagesRead: formData.get("pagesRead"),
    rating: formData.get("rating"),
    note: formData.get("note"),
  });
}

function revalidateLogViews() {
  revalidatePath("/app");
  revalidatePath("/app/history");
  revalidatePath("/app/stats");
  revalidatePath("/app/export");
  revalidatePath("/app/settings");
}

export async function createLogEntry(formData: FormData) {
  const session = await getRequiredSession();
  const values = await parseEntry(formData);

  await ensureUserCanCreateEntry(session.user.id, session.user.subscriptionStatus);

  await prisma.logEntry.create({
    data: {
      userId: session.user.id,
      title: values.title,
      normalizedTitle: normalizeTitle(values.title),
      author: values.author || null,
      loggedAt: new Date(values.loggedAt),
      pagesRead: values.pagesRead,
      rating: values.rating,
      note: values.note || null,
    },
  });

  revalidateLogViews();
}

export async function updateLogEntry(formData: FormData) {
  const session = await getRequiredSession();
  const id = String(formData.get("id") || "");
  const values = await parseEntry(formData);

  await prisma.logEntry.updateMany({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      title: values.title,
      normalizedTitle: normalizeTitle(values.title),
      author: values.author || null,
      loggedAt: new Date(values.loggedAt),
      pagesRead: values.pagesRead,
      rating: values.rating,
      note: values.note || null,
    },
  });

  revalidateLogViews();
}

export async function deleteLogEntry(formData: FormData) {
  const session = await getRequiredSession();
  const id = String(formData.get("id") || "");

  await prisma.logEntry.deleteMany({
    where: {
      id,
      userId: session.user.id,
    },
  });

  revalidateLogViews();
}

export async function updateProfileAction(formData: FormData) {
  const session = await getRequiredSession();
  const name = String(formData.get("name") || "").trim();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name || null },
  });

  revalidatePath("/app/settings");
}
