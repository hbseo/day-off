import Breadcrumbs from '@/components/breadcrumbs';
import CardWrapper from '@/components/off/cards';
import { Suspense } from 'react';
import Form from '@/components/off/form';
import { CardSkeleton, FormSkeleton } from '@/components/off/skeletons';

const Page = () => {
  return (
    <div className="px-2">
      <Breadcrumbs
        breadcrumbs={[
          { label: '휴가', href: '/off' },
          { label: '신청', href: '/off/create', active: true },
        ]}
      />
      <main className="space-y-4">
        <h1 className="text-xl font-bold">현황</h1>
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
        <Suspense fallback={<FormSkeleton />}>
          <Form />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
