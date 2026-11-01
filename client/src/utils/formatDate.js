export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-CA", {
    year: "numeric",
    monrh: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
