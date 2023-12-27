import Breadcrumbs from '@/components/breadcrumbs';
import Form from '@/components/off/create-form';

const Page = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: '휴가', href: '/off' },
          { label: '신청', href: '/off/create', active: true },
        ]}
      />
      <Form />
    </div>
  );
};

export default Page;
