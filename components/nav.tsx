'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LucideIcon, LayoutDashboard, Palmtree } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef, Ref } from 'react';

type NavigationItem = {
  name?: string;
  href: string;
  icon: LucideIcon;
};

const dummy: NavigationItem[] = [
  {
    name: 'ㅇㅇ',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: '휴가',
    href: '/off',
    icon: Palmtree,
  },
];

const NavItem = ({ name, href, icon }: NavigationItem) => {
  const pathname = usePathname();
  const firstPathname = '/' + pathname.split('/')[1];
  const LinkIcon = icon;

  return (
    <Link href={href}>
      <Button
        variant={firstPathname === href ? 'secondary' : 'ghost'}
        className="flex w-full items-center justify-start gap-3 whitespace-nowrap text-sm font-medium transition-colors"
      >
        <LinkIcon className="w-6" />
        {name}
      </Button>
    </Link>
  );
};

const NavItemCollapsed = forwardRef(function NavItemCollapsed(
  { href, icon }: NavigationItem,
  ref: Ref<HTMLAnchorElement>
) {
  const pathname = usePathname();
  const firstPathname = '/' + pathname.split('/')[1];
  const LinkIcon = icon;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: firstPathname === href ? 'secondary' : 'ghost',
          size: 'icon',
        })
      )}
      ref={ref}
    >
      <LinkIcon className="w-6" />
    </Link>
  );
});

const Nav = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {dummy.map((item) =>
          isCollapsed ? (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavItemCollapsed
                  href={item.href}
                  key={item.name}
                  icon={item.icon}
                />
              </TooltipTrigger>
              <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
          ) : (
            <NavItem
              name={item.name}
              href={item.href}
              key={item.name}
              icon={item.icon}
            />
          )
        )}
      </nav>
    </div>
  );
};

export default Nav;
