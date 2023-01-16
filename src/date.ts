const now : Date = new Date();

export const currentDate : string = now.toLocaleDateString('en-ca');

export const dayAfterTomorrowDate: string = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).toLocaleDateString('en-ca');

export const lastDayOfNextMonthDate : string = new Date(now.getFullYear(), now.getMonth() + 2, 0).toLocaleDateString('en-ca');

export function getDayAfterTomorrowDate(dateString) {
  const date = new Date(dateString);
  const dayAfterTomorrowDate: string = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2).toLocaleDateString('en-ca');
  return dayAfterTomorrowDate;
}
