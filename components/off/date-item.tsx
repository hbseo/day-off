import { getMonth, getDate, getYear, getDay } from 'date-fns';

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

const DateItem = ({ date, type }: { date: Date; type: number }) => {
  const year = getYear(date);
  const month = getMonth(date);
  const ddate = getDate(date);
  const day = getDay(date);
  return <div>{dayList[day]}</div>;
};

export default DateItem;
