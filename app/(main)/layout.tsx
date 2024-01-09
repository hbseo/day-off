import Header from '@/components/header';
import Nav from '@/components/nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Providers from './providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex h-full w-full flex-col items-stretch">
        <Header />
        <Separator />
        <div className="flex h-[calc(100%-41px)] flex-row">
          <Nav />
          <Separator orientation="vertical" />
          <ScrollArea className="w-full px-2 py-4">{children}</ScrollArea>
        </div>
      </div>
    </Providers>
  );
}
