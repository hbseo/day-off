'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { OffType, User } from '@/lib/definition';
import { zodResolver } from '@hookform/resolvers/zod';
import { ko } from 'date-fns/locale';
import { Eraser } from 'lucide-react';
import { useRef, useState } from 'react';
import { ControllerRenderProps, UseFormReturn, useForm } from 'react-hook-form';
import ReactSignatureCanvas from 'react-signature-canvas';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from '../ui/drawer';
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import DateItem from './date-item';
import DropdownForm from './dropdown-form';

export const offFormSchema = z.object({
  fromUser: z.number({
    required_error: '신청자를 선택해야 합니다.',
  }),
  toUser: z.number({
    required_error: '결재자를 선택해야 합니다.',
  }),
  type: z.number({
    required_error: '종류를 선택해야 합니다.',
  }),
  reason: z
    .string({
      required_error: '사유를 입력해야 합니다.',
    })
    .max(100, { message: '100자 이하로 입력해주세요.' })
    .optional(),
  date: z
    .array(z.object({ date: z.date(), type: z.string() }), {
      required_error: '날짜를 하나 이상 선택하세요.',
    })
    .nonempty({ message: '날짜를 하나 이상 선택하세요.' }),
  signature: z.string(),
});

const CreateForm = ({ users, types }: { users: User[]; types: OffType[] }) => {
  const [signOpen, setSignOpen] = useState(false);
  const signCanvas = useRef<ReactSignatureCanvas>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleSignature = (
    form: UseFormReturn<z.infer<typeof offFormSchema>, any, undefined>,
    field: ControllerRenderProps<z.infer<typeof offFormSchema>, 'signature'>
  ) => {
    if (!signCanvas.current) return;

    if (signCanvas.current.isEmpty()) {
      toast.error('서명을 해주세요.');
      return;
    }
    field.onChange(signCanvas.current.toDataURL());

    form.handleSubmit(onSubmit)();
    setSignOpen(false);
  };

  const handleErase = () => {
    if (!signCanvas.current) return;

    signCanvas.current.clear();
  };

  const form = useForm<z.infer<typeof offFormSchema>>({
    resolver: zodResolver(offFormSchema),
    defaultValues: {
      reason: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof offFormSchema>) => {
    console.log(data);
    toast.success('휴가 신청을 완료했습니다.');
    // createOff(data);
  };

  return (
    <FormContainer {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <DropdownForm
            form={form}
            name="fromUser"
            title="신청"
            data={users}
            keyField="id"
            displayField="name"
            placeholder="신청자 본인을 선택합니다."
          />
          <DropdownForm
            form={form}
            name="toUser"
            title="결재"
            data={users}
            keyField="id"
            displayField="name"
            placeholder="결재해 줄 사람을 선택합니다."
          />
        </div>
        <DropdownForm
          form={form}
          name="type"
          title="종류"
          data={types}
          keyField="id"
          displayField="type"
          placeholder="휴가 종류를 선택합니다."
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">사유</FormLabel>
              <FormControl>
                <Input placeholder="사유를 입력하세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-bold">날짜</FormLabel>
              <FormControl>
                <div className="grid sm:gap-4 md:grid-cols-[1fr_0fr_3fr]">
                  <Calendar
                    mode={'multiple'}
                    selected={field.value?.map((date) => date?.date)}
                    onSelect={(date) => {
                      const afterDate: { date: Date; type: string }[] = [];

                      field.value?.forEach((f) => {
                        const pos = date?.indexOf(f.date);
                        if (pos !== undefined && pos >= 0) {
                          afterDate.push(f);
                          if (date) delete date[pos];
                        }
                      });

                      date?.forEach((d) => {
                        if (d) {
                          afterDate.push({ date: d, type: 'all' });
                        }
                      });
                      afterDate.sort(
                        (o1, o2) => o1.date.getTime() - o2.date.getTime()
                      );
                      field.onChange(afterDate);
                    }}
                    disabled={(date) => date < new Date('2023-01-01')}
                    locale={ko}
                    initialFocus
                    className="flex justify-center"
                  />
                  <Separator orientation="vertical" />
                  <ScrollArea className="max-h-32 sm:max-h-[350px]">
                    <ul className="flex flex-col gap-2">
                      {field.value?.map((date, index) => (
                        <Card
                          key={index}
                          className="flex h-16 flex-col justify-center gap-2 px-3 lg:h-9 lg:flex-row lg:items-center lg:justify-normal lg:gap-0 lg:gap-x-2"
                        >
                          <DateItem date={date.date} />
                          <RadioGroup
                            onValueChange={(value) => {
                              const afterDate = field.value;
                              afterDate[index].type = value;
                              field.onChange(afterDate);
                            }}
                            defaultValue={field.value[index].type}
                            className="flex w-64"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="all"
                                  checked={field.value[index].type === 'all'}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                연차
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="morning"
                                  checked={
                                    field.value[index].type === 'morning'
                                  }
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                오전 반차
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value="afternoon"
                                  checked={
                                    field.value[index].type === 'afternoon'
                                  }
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                오후 반차
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </Card>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </FormControl>
              <FormDescription>
                원하는 날짜를 선택하여 추가 또는 삭제를 합니다. 연차 / 반차
                여부를 선택합니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              {isDesktop ? (
                <Dialog open={signOpen} onOpenChange={setSignOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>서명</DialogTitle>
                      <DialogDescription>
                        직접 마우스로 서명을 하세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative">
                      <ReactSignatureCanvas
                        penColor="black"
                        canvasProps={{
                          className:
                            'w-full h-[300px] rounded-lg border-2 border-slate-600',
                        }}
                        ref={signCanvas}
                      />
                      <Button
                        onClick={handleErase}
                        className="absolute bottom-2 right-2 w-16 rounded-full border border-black"
                      >
                        <Eraser />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => {
                          handleSignature(form, field);
                        }}
                      >
                        제출
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSignOpen(false);
                        }}
                      >
                        취소
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Drawer
                  open={signOpen}
                  onOpenChange={setSignOpen}
                  dismissible={false}
                >
                  <DrawerContent>
                    <DrawerHeader className="text-left text-lg font-semibold">
                      서명
                    </DrawerHeader>
                    <DrawerDescription className="px-4">
                      직접 마우스로 서명을 하세요.
                    </DrawerDescription>
                    <div className="relative px-4 py-2">
                      <ReactSignatureCanvas
                        penColor="black"
                        canvasProps={{
                          className:
                            'w-full h-[300px] rounded-lg border-2 border-slate-600',
                        }}
                        ref={signCanvas}
                      />
                      <Button
                        onClick={handleErase}
                        className="absolute bottom-4 right-6 w-16 rounded-full border border-black"
                      >
                        <Eraser />
                      </Button>
                    </div>
                    <DrawerFooter className="grid gap-2">
                      <Button
                        onClick={() => {
                          handleSignature(form, field);
                        }}
                      >
                        제출
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSignOpen(false);
                        }}
                      >
                        취소
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </FormItem>
          )}
        />
        <Button
          className="w-full sm:w-28"
          type="button"
          onClick={() => {
            form
              .trigger(['date', 'fromUser', 'reason', 'toUser', 'type'])
              .then((valid) => {
                if (valid) {
                  setSignOpen(true);
                }
              });
          }}
        >
          신청
        </Button>
      </form>
    </FormContainer>
  );
};

export default CreateForm;
