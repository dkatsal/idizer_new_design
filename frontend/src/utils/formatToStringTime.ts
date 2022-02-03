export function formatToStringTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}
