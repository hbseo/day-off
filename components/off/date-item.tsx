import { getMonth, getDate, getYear, getDay } from 'date-fns';

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

const DateItem = ({ date, type }: { date: Date; type?: number }) => {
  const year = getYear(date);
  const month = getMonth(date) + 1;
  const ddate = getDate(date);
  const day = getDay(date);
  return (
    <div className="w-40 font-medium">
      {year}년 {month}월 {ddate}일 ({dayList[day]})
    </div>
  );
};

export default DateItem;
