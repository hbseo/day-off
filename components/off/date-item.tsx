import { getFormattedDate } from '@/lib/utils';

const DateItem = ({ date }: { date: Date }) => {
  const formattedDate = getFormattedDate(date);
  return <div className="w-40 font-medium">{formattedDate}</div>;
};

export default DateItem;
