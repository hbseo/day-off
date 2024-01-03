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

const OffTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const offList = await fetchTableData(query, currentPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>신청 일</TableHead>
          <TableHead>종료 일</TableHead>
          <TableHead>사용 휴가</TableHead>
          <TableHead>사유</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>수정</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offList.map((off) => (
          <TableRow key={off.id}>
            <TableCell>{getFormattedDate(off.createdAt)}</TableCell>
            {/* <TableCell>{getFormattedDate(off.end_date)}</TableCell> */}
            {/* <TableCell>{off.count}</TableCell> */}
            {/* <TableCell>{off.reason}</TableCell> */}
            {/* <TableCell>{off.status}</TableCell> */}
            <TableCell>
              <div className="justify-end, flex gap-3"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OffTable;
