import { LayoutDashboard, Palmtree } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { NavItem, NavItemCollapsed, NavigationItem } from './nav-item';

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
