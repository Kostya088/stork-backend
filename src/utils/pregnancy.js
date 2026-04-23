/** Єдина базова функція для роботи з датами */
import { ONE_DAY, MAX_WEEK } from '../constants/time.js';

export const getDiffDaysToDue = (dueDate) => {
  if (!dueDate) return null;

  const due = new Date(dueDate);
  const now = new Date();

  return Math.ceil((due - now) / ONE_DAY);
};

/** Розрахунок тижня вагітності */
export const getWeekNumberFromDueDate = (dueDate) => {
  const diffDays = getDiffDaysToDue(dueDate);

  if (diffDays === null) return null;
  if (diffDays < 0) return MAX_WEEK;

  const daysPregnant = 280 - diffDays;
  const weekNumber = Math.ceil(daysPregnant / 7);

  return Math.min(Math.max(weekNumber, 1), MAX_WEEK);
};

/** К-сть днів до пологів (якщо є dueDate) */
export const getDaysUntilDue = (dueDate) => {
  return getDiffDaysToDue(dueDate);
};

/** Fallback якщо немає dueDate */
export const getDaysUntilDueFallback = (weekNumber) => {
  if (!weekNumber) return null;

  return (MAX_WEEK - weekNumber) * 7;
};
