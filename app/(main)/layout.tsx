import Header from '@/components/header';
import Nav from '@/components/nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-stretch">
      <Header />
      <Separator />
      <div className="flex h-full w-full">
        <div className="flex w-60 flex-col">
          <Nav />
        </div>
        <Separator orientation="vertical" />
        <main className="grow p-4">{children}</main>
      </div>
    </div>
  );
}
