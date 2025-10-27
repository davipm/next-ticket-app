'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  PRIORITY_LEVELS,
  PROGRESS_MAX,
  PROGRESS_MIN,
  PROGRESS_STEP,
  TICKET_CATEGORIES,
  TICKET_STATUS,
} from '@/constants';
import { useCreateTicket, useUpdateTicket } from '@/hooks/use-ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TicketSchema, ticketDefaultValues, ticketSchema } from '@next-ticket-app/schemas';
import type { Ticket } from '@next-ticket-app/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  id?: string;
  ticketToEdit?: Ticket | null;
};

/**
 * Component for rendering a form to create or update a ticket.
 * Handles form submission and manages state for ticket data.
 *
 * @param {Object} param - Component properties.
 * @param {string} param.id - ID of the ticket being edited (if in edit mode).
 * @param {Object} param.ticketToEdit - Data of the ticket to edit (used in edit mode).
 */
export function TicketForm({ id, ticketToEdit }: Props) {
  const router = useRouter();
  const isEditMode = !!id;

  const form = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: ticketDefaultValues,
  });

  const handleSuccess = useCallback(() => {
    router.push(`/`);
    form.reset(ticketDefaultValues);

    toast.success(isEditMode ? 'Ticket updated successfully' : 'Ticket created successfully');
  }, [router, isEditMode]);

  const handleError = useCallback(
    (error: Error) => {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} ticket: ${error.message}`);
    },
    [isEditMode],
  );

  const { createTicketMutation } = useCreateTicket();
  const { updateTicketMutation } = useUpdateTicket();

  const onSubmit: SubmitHandler<TicketSchema> = useCallback(
    (data) => {
      const mutationOptions = {
        onSuccess: handleSuccess,
        onError: handleError,
      };

      if (isEditMode) {
        updateTicketMutation({ id, data }, mutationOptions);
      } else {
        createTicketMutation(data, mutationOptions);
      }
    },
    [isEditMode, id, createTicketMutation, updateTicketMutation, handleSuccess, handleError],
  );

  useEffect(() => {
    if (isEditMode && ticketToEdit) {
      form.reset({
        ...ticketToEdit,
        priority: Number(ticketToEdit.priority),
      });
    } else if (!isEditMode) {
      form.reset(ticketDefaultValues);
    }
  }, [form, isEditMode, ticketToEdit]);

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-lg flex-col gap-5"
        >
          <h3 className="mt-5 text-3xl font-bold text-center">
            {isEditMode ? 'Update your ticket' : 'Create new Ticket'}
          </h3>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} className="p-1 m-1 rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type your Description here."
                    className="bg-custom-card text-white placeholder-white"
                    cols={30}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {TICKET_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value)}
                    className="flex flex-col"
                  >
                    {Array.from({ length: PRIORITY_LEVELS }, (_, index) => (
                      <FormItem key={index + 1} className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value={String(index + 1)} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">{index + 1}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="progress"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Progress</FormLabel>
                <FormControl>
                  <Slider
                    min={PROGRESS_MIN}
                    max={PROGRESS_MAX}
                    step={PROGRESS_STEP}
                    value={[value]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={onChange}
                    defaultValue="not started"
                    className="flex flex-col space-y-1"
                    value={value}
                  >
                    {TICKET_STATUS.map(({ value, name }, index) => (
                      <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">{name}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-5 max-w-xs bg-custom-card text-white hover:text-blue-950 hover:cursor-pointer"
          >
            {isEditMode ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
