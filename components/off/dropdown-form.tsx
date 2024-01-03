'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const DropdownForm = ({
  form,
  name,
  title,
  data,
  keyField,
  displayField,
  description,
  placeholder = '',
}: {
  form: any;
  name: string;
  title: string;
  data: any;
  keyField: string;
  displayField: string;
  description?: string;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-md font-bold">{title}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
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
                  {field.value ? (
                    data.find((d: any) => d[keyField] === field.value)[
                      displayField
                    ]
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 popover-content-fit-trigger">
              <Command>
                <CommandInput placeholder="검색" className="h-9" />
                <CommandEmpty>없음</CommandEmpty>
                <CommandGroup>
                  {data.map((d: any) => (
                    <CommandItem
                      value={d[displayField]}
                      key={d[keyField]}
                      onSelect={() => {
                        form.setValue(name, d[keyField]);
                        setOpen(false);
                      }}
                    >
                      {d[displayField]}
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          d[keyField] === field.value
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
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default DropdownForm;
