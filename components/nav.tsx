'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { WindowIcon } from '@heroicons/react/24/solid';

const dummy: { name: string; href: string; icon: unknown }[] = [
  {
    name: 'ㅇㅇ',
    href: '/',
    icon: WindowIcon,
  },
  {
    name: '대시보드',
    href: '/dashboard',
    icon: WindowIcon,
  },
  {
    name: '휴가',
    href: '/off',
    icon: WindowIcon,
  },
];

const NavItem = ({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: any;
}) => {
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

const Nav = () => {
  return (
    <nav className="flex flex-col gap-1 px-4 py-2">
      {dummy.map((item) => {
        return (
          <NavItem
            name={item.name}
            href={item.href}
            key={item.name}
            icon={item.icon}
          ></NavItem>
        );
      })}
    </nav>
  );
};

export default Nav;
