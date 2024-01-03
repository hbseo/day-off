import Link from 'next/link';
import { Button } from '../ui/button';
import { PlusIcon, Pencil, XCircle } from 'lucide-react';

export const CreateOff = () => {
  return (
    <Link href="/off/create">
      <Button>
        휴가 신청 <PlusIcon className="h-5" />
      </Button>
    </Link>
  );
};

export const UpdateOff = ({ id }: { id: string }) => {
  return (
    <Link href={`/off/${id}/edit`}>
      <Pencil className="h-4" />
    </Link>
  );
};

export const DeleteOff = ({ id }: { id: string }) => {
  return (
    <form>
      <Button>
        <XCircle className="w-4" />
      </Button>
    </form>
  );
};
