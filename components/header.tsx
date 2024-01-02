import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavPanelStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { LogOut, Menu, Settings, User } from 'lucide-react';
import { Separator } from './ui/separator';

const Header = () => {
  const { isCollapsed, setIsCollapsed } = useNavPanelStore();

  return (
    <header className="flex h-10 items-center px-4 py-2">
      <Menu
        className={cn(
          'mr-4 hidden cursor-pointer transition-all duration-300 ease-in-out sm:block',
          isCollapsed && 'rotate-90'
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <span>헤더</span>
      <div className="absolute right-4 flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-7 w-7 cursor-pointer">
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <Separator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>정보</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>설정</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <Separator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
