export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

export const toDateInput = (iso: string) => new Date(iso).toISOString().slice(0, 10);
