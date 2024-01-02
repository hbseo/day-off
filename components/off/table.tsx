import { fetchTableData } from '@/lib/off/data';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '../ui/table';
import { getFormattedDate } from '@/lib/utils';

const OffTable = async () => {
  const offList = await fetchTableData();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>시작 일</TableHead>
          <TableHead>종료 일</TableHead>
          <TableHead>사용 휴가</TableHead>
          <TableHead>사유</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offList.map((off) => (
          <TableRow key={off.id}>
            <TableCell>{getFormattedDate(off.start_date)}</TableCell>
            <TableCell>{getFormattedDate(off.end_date)}</TableCell>
            <TableCell>{off.count}</TableCell>
            <TableCell>{off.reason}</TableCell>
            <TableCell>{off.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OffTable;
