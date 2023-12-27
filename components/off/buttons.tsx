import Link from 'next/link';
import { Button } from '../ui/button';
import { PlusIcon } from 'lucide-react';

export const CreateOff = () => {
  return (
    <Link href="/off/create">
      <Button>
        휴가 신청 <PlusIcon className="h-5" />
      </Button>
    </Link>
  );
};
