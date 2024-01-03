import { Button, buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export const FormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <div className="text-md font-bold">신청</div>
          <Skeleton className={buttonVariants({ variant: 'ghost' })} />
        </div>
        <div className="flex flex-col">
          <div className="text-md font-bold">결재</div>
          <Skeleton className={buttonVariants({ variant: 'ghost' })} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-md font-bold">종류</div>
        <Skeleton className={buttonVariants({ variant: 'ghost' })} />
      </div>
      <div className="flex flex-col">
        <div className="text-md font-bold">날짜</div>
        <div className="grid h-[300px] sm:gap-4 md:grid-cols-[1fr_0fr_3fr]">
          <Skeleton />
          <Separator orientation="vertical" />
          <div></div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-md font-bold">사유</div>
        <Skeleton className={buttonVariants({ variant: 'ghost' })} />
      </div>
      <Button className="w-full sm:w-28" disabled>
        신청
      </Button>
    </div>
  );
};

export const TableSkeleton = () => {
  const TRow = () => {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-full" />
        </TableCell>
      </TableRow>
    );
  };
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
        <TRow />
        <TRow />
        <TRow />
        <TRow />
        <TRow />
        <TRow />
        <TRow />
      </TableBody>
    </Table>
  );
};
