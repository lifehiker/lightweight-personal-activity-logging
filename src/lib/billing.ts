import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";

export async function getUserEntryCount(userId: string) {
  return prisma.logEntry.count({
    where: { userId },
  });
}

export async function ensureUserCanCreateEntry(userId: string, subscriptionStatus: string) {
  if (subscriptionStatus === "premium") {
    return;
  }

  const count = await getUserEntryCount(userId);
  if (count >= siteConfig.freeEntryLimit) {
    throw new Error("Free plan limit reached. Upgrade to keep logging.");
  }
}

export function isPremium(subscriptionStatus: string) {
  return subscriptionStatus === "premium";
}
