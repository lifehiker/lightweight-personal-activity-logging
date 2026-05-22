import { differenceInCalendarDays, getYear, isSameDay, subDays } from "date-fns";

type EntryDate = {
  loggedAt: Date;
  normalizedTitle: string;
};

function uniqueDays(entries: EntryDate[]) {
  const sorted = [...entries].sort((a, b) => b.loggedAt.getTime() - a.loggedAt.getTime());
  return sorted.filter((entry, index, array) => {
    const previous = array[index - 1];
    return !previous || !isSameDay(previous.loggedAt, entry.loggedAt);
  });
}

export function getCurrentStreak(entries: EntryDate[]) {
  const days = uniqueDays(entries);
  if (days.length === 0) {
    return 0;
  }

  const today = new Date();
  const latest = days[0].loggedAt;
  const latestDiff = differenceInCalendarDays(today, latest);

  if (latestDiff > 1) {
    return 0;
  }

  let streak = 1;
  let cursor = latestDiff === 1 ? subDays(today, 1) : today;

  for (let index = 1; index < days.length; index += 1) {
    const target = subDays(cursor, 1);
    if (isSameDay(days[index].loggedAt, target)) {
      streak += 1;
      cursor = target;
    } else {
      break;
    }
  }

  return streak;
}

export function getLongestStreak(entries: EntryDate[]) {
  const days = uniqueDays(entries).sort((a, b) => a.loggedAt.getTime() - b.loggedAt.getTime());
  if (days.length === 0) {
    return 0;
  }

  let best = 1;
  let current = 1;

  for (let index = 1; index < days.length; index += 1) {
    const delta = differenceInCalendarDays(days[index].loggedAt, days[index - 1].loggedAt);
    if (delta === 1) {
      current += 1;
      best = Math.max(best, current);
    } else if (delta > 1) {
      current = 1;
    }
  }

  return best;
}

export function getYearlyCounts(entries: EntryDate[], year = getYear(new Date())) {
  const inYear = entries.filter((entry) => getYear(entry.loggedAt) === year);
  const uniqueBooks = new Set(inYear.map((entry) => entry.normalizedTitle));

  return {
    booksFinished: uniqueBooks.size,
    totalEntries: inYear.length,
  };
}
