export function isTodayOrYesterday(streak: {
  streak: number;
  lastAnsweredDate: Date;
}) {
  const lastAnswered = new Date(streak.lastAnsweredDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    lastAnswered.getTime() === today.getTime() ||
    lastAnswered.getTime() === yesterday.getTime()
  );
}
