import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function csvEscape(value: string | number | null) {
  if (value === null) {
    return "";
  }

  const output = String(value).replace(/"/g, '""');
  return `"${output}"`;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.subscriptionStatus !== "premium") {
    return NextResponse.json({ error: "Premium required" }, { status: 403 });
  }

  const entries = await prisma.logEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { loggedAt: "desc" },
  });

  const header = ["title", "author", "loggedAt", "pagesRead", "rating", "note", "createdAt"];
  const rows = entries.map((entry) =>
    [
      csvEscape(entry.title),
      csvEscape(entry.author),
      csvEscape(entry.loggedAt.toISOString()),
      csvEscape(entry.pagesRead),
      csvEscape(entry.rating),
      csvEscape(entry.note),
      csvEscape(entry.createdAt.toISOString()),
    ].join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="readlog-export.csv"',
    },
  });
}
