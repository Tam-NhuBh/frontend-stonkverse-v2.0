export const formatShortDate = (ms: number) => {
  const date = new Date(ms);

  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("vi", options);
};

export const formatVideoLength = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} minutes`;
  }

  return `${hours}h ${minutes}m`;
};
