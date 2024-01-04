import { LayoutDashboard, Palmtree } from 'lucide-react';
import { NavItem, NavItemCollapsed, NavigationItem } from './nav-item';
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useNavPanelStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

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

const Nav = () => {
  const { isCollapsed, setIsCollapsed } = useNavPanelStore();

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsCollapsed(true);
    }
  }, [setIsCollapsed]);

  return (
    <ScrollArea
      data-collapsed={isCollapsed}
      className={cn(
        'group flex h-full flex-col gap-4 py-2 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[58px]' : 'w-56'
      )}
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
    </ScrollArea>
  );
};

export default Nav;
