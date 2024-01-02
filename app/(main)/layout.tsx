'use client';

import Header from '@/components/header';
import Nav from '@/components/nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useNavPanelStore } from '@/lib/store';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setIsCollapsed } = useNavPanelStore();

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 640) {
      setIsCollapsed(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full w-full flex-col items-stretch">
        <Header />
        <Separator />
        <div className="flex h-[calc(100%-41px)] flex-row">
          <Nav />
          <Separator orientation="vertical" />
          <ScrollArea className="w-full px-2 py-4">{children}</ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
}
