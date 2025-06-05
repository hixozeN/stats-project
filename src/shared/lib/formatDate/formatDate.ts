export function formatDate(dateString: Date | string, withoutMinutes?: boolean): string {
  if (!dateString) return null;
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (withoutMinutes) return `${day}.${month}.${year}`;

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
