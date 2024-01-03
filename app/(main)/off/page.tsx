import Search from '@/components/search';
import { CreateOff } from '@/components/off/buttons';
import OffTable from '@/components/off/table';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/off/skeletons';

const Page = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full px-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">휴가</h1>
      </div>
      <div className="mt-8 flex items-center justify-between gap-2">
        <Search placeholder="placeholder" />
        <CreateOff />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <OffTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
};

export default Page;
