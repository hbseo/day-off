'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef, Ref } from 'react';

export type NavigationItem = {
  name?: string;
  href: string;
  icon: LucideIcon;
};

export const NavItem = ({ name, href, icon }: NavigationItem) => {
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

export const NavItemCollapsed = forwardRef(function NavItemCollapsed(
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
