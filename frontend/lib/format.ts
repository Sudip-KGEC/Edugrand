export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

export function daysLeft(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export function deadlineLabel(iso: string) {
  const days = daysLeft(iso);
  if (days === 0) return "Closes today";
  if (days === 1) return "1 day left";
  if (days <= 30) return `${days} days left`;
  return formatDate(iso);
}
