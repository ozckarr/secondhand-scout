export default function formatDatePosted(date: string): string {
  //TODO: Create handling of "hour ago" > "days ago" > "date"
  const now = new Date(Date.now());
  const current = new Date(date);

  const diff = now.getTime() - current.getTime();
  return (diff / 1000 / 60 / 60).toFixed(0);
}
