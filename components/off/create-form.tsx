'use client';

import {
  Form as FormContainer,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const offFormSchema = z.object({
  username: z.string(),
});

type OffFormValues = z.infer<typeof offFormSchema>;

const Form = () => {
  const form = useForm<OffFormValues>({
    resolver: zodResolver(offFormSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: OffFormValues) => {};

  return (
    <FormContainer {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input></Input>
              </FormControl>
              <FormDescription>여긴 설명</FormDescription>
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
