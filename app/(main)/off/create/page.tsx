import Breadcrumbs from '@/components/breadcrumbs';
import CardWrapper from '@/components/off/cards';
import Form from '@/components/off/create-form';

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
        <CardWrapper />
        <Form />
      </main>
    </div>
  );
};

export default Page;
