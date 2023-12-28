'use client';

import { fetchTypeData } from '@/lib/off/data';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ko } from 'date-fns/locale';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import {
  Form as FormContainer,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import DateItem from './date-item';
import { getMonth, getDate, getYear, getDay } from 'date-fns';

const offFormSchema = z.object({
  fromUser: z.number({
    required_error: '신청자를 선택해야 합니다..',
  }),
  toUser: z.number({
    required_error: '결재자를 선택해야 합니다.',
  }),
  type: z.number({
    required_error: '종류를 선택해야 합니다.',
  }),
  reason: z.string({
    required_error: '사유를 입력해야 합니다.',
  }),
  date: z.object({ date: z.date(), type: z.number() }),
});

const Form = () => {
  const [openFromUser, setOpenFromUser] = useState(false);
  const [openToUser, setOpenToUser] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [dateList, setDateList] = useState<
    {
      date: Date;
      type: number;
    }[]
  >([]);

  const form = useForm<z.infer<typeof offFormSchema>>({
    resolver: zodResolver(offFormSchema),
  });

  const onSubmit = (data: z.infer<typeof offFormSchema>) => {};

  const users = [
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'Lee',
    },
  ];
  const types = fetchTypeData();

  return (
    <FormContainer {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fromUser"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>신청</FormLabel>
                <Popover open={openFromUser} onOpenChange={setOpenFromUser}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? users.find((user) => user.id === field.value)?.name
                          : '선택하세요.'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="popover-content-fit-trigger p-0">
                    <Command>
                      <CommandInput placeholder="검색" className="h-9" />
                      <CommandEmpty>없음</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            value={user.name}
                            key={user.id}
                            onSelect={() => {
                              form.setValue('fromUser', user.id);
                              setOpenFromUser(false);
                            }}
                          >
                            {user.name}
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4',
                                user.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>신청자 본인을 선택합니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toUser"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>결재</FormLabel>
                <Popover open={openToUser} onOpenChange={setOpenToUser}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? users.find((user) => user.id === field.value)?.name
                          : '선택하세요.'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="popover-content-fit-trigger p-0">
                    <Command>
                      <CommandInput placeholder="검색" className="h-9" />
                      <CommandEmpty>없음</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            value={user.name}
                            key={user.id}
                            onSelect={() => {
                              form.setValue('toUser', user.id);
                              setOpenToUser(false);
                            }}
                          >
                            {user.name}
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4',
                                user.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>결재해 줄 사람을 선택합니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>종류</FormLabel>
              <Popover open={openType} onOpenChange={setOpenType}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? types.find((type) => type.id === field.value)?.type
                        : '선택하세요.'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="popover-content-fit-trigger p-0">
                  <Command>
                    <CommandInput placeholder="검색" className="h-9" />
                    <CommandEmpty>없음</CommandEmpty>
                    <CommandGroup>
                      {types.map((type) => (
                        <CommandItem
                          value={type.type}
                          key={type.id}
                          onSelect={() => {
                            form.setValue('type', type.id);
                            setOpenType(false);
                          }}
                        >
                          {type.type}
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              type.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>날짜</FormLabel>
              <FormControl>
                <div className="grid sm:grid-cols-[1fr_0fr_3fr] sm:gap-4">
                  <Calendar
                    mode={'multiple'}
                    selected={dateList.map((date) => date.date)}
                    onSelect={(date) => {
                      console.log(date);
                      if (!date) return;
                      const newDateList = [...dateList].push({
                        date: date[date.length - 1],
                        type: 1,
                      });
                      if (!date) return;
                      // if (
                      //   dateList.find((d) => {
                      //     if (
                      //       getYear(d.date) === getYear(date) &&
                      //       getMonth(d.date) === getMonth(date) &&
                      //       getDate(d.date) === getDate(date)
                      //     )
                      //       return true;
                      //   })
                      // )
                      //   return;
                      // const newDateList = [
                      //   ...dateList,
                      //   {
                      //     date: date,
                      //     type: 1,
                      //   },
                      // ];
                      // newDateList.sort(
                      //   (d1, d2) => d1.date.getTime() - d2.date.getTime()
                      // );
                      // setDateList(newDateList);
                    }}
                    disabled={(date) => date < new Date('2023-01-01')}
                    locale={ko}
                    initialFocus
                    className="flex justify-center"
                  />
                  <Separator orientation="vertical" />
                  <ScrollArea className="max-h-28 sm:max-h-[350px]">
                    <ul className="flex flex-col">
                      {dateList.map((date, index) =>
                        date.date ? (
                          <DateItem
                            key={index}
                            date={date.date}
                            type={date.type}
                          />
                        ) : null
                      )}
                    </ul>
                  </ScrollArea>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사유</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">버튼</Button>
      </form>
    </FormContainer>
  );
};

export default Form;
