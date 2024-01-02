import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getMonth, getDate, getYear, getDay } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date: Date, showDay: boolean = false) {
  const year = getYear(date);
  const month = getMonth(date) + 1;
  const ddate = getDate(date);
  const day = getDay(date);
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  if (showDay) return `${year}년 ${month}월 ${ddate}일 (${dayList[day]})`;
  return `${year}년 ${month}월 ${ddate}일`;
}
