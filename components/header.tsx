import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Separator } from './ui/separator';
import { User, Settings, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex h-10 items-center justify-between px-4 py-2">
      <span>헤더</span>
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
            <DropdownMenuItem value="info">
              <User className="mr-2 h-4 w-4" />
              <span>정보</span>
            </DropdownMenuItem>
            <DropdownMenuItem value="info">
              <Settings className="mr-2 h-4 w-4" />
              <span>설정</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <Separator />
          <DropdownMenuItem value="logout">
            <LogOut className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
