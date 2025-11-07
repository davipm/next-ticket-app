'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
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
import { type FormTicketSchema, formTicketSchema, type TicketSchema } from '@/lib/types';

type Props = {
  id?: string;
  ticketToEdit?: TicketSchema | null;
};

export function TicketForm({ id, ticketToEdit }: Props) {
  const router = useRouter();
  const isEditMode = !!id;

  const form = useForm<FormTicketSchema>({
    resolver: zodResolver(formTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 1,
      progress: 0,
      category: 'Hardware Problem',
      status: 'not started',
    },
  });

  const handleSuccess = () => {
    router.push(`/`);
    form.reset();

    toast.success(isEditMode ? 'Ticket updated successfully' : 'Ticket created successfully');
  };

  const handleError = (error: Error) => {
    toast.error(`Failed to ${isEditMode ? 'update' : 'create'} ticket: ${error.message}`);
  };

  const { createTicketMutation } = useCreateTicket();
  const { updateTicketMutation } = useUpdateTicket();

  const onSubmit: SubmitHandler<FormTicketSchema> = (data) => {
    const mutationOptions = {
      onSuccess: handleSuccess,
      onError: handleError,
    };

    if (isEditMode) {
      updateTicketMutation({ id, data }, mutationOptions);
    } else {
      createTicketMutation(data, mutationOptions);
    }
  };

  useEffect(() => {
    if (isEditMode && ticketToEdit) {
      form.reset({
        ...ticketToEdit,
        priority: Number(ticketToEdit.priority),
      });
    } else if (!isEditMode) {
      form.reset();
    }
  }, [form, isEditMode, ticketToEdit]);

  return (
    <div className="flex justify-center">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-lg flex-col gap-5">
        <h3 className="mt-5 text-3xl font-bold text-center">
          {isEditMode ? 'Update your ticket' : 'Create new Ticket'}
        </h3>

        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Title
                </FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Description
                </FieldLabel>
                <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Category
                </FieldLabel>
                <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full" id={field.name}>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {TICKET_CATEGORIES.map((category) => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="priority"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Category
                </FieldLabel>
                <RadioGroup
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={String(field.value)}
                >
                  {Array.from({ length: PRIORITY_LEVELS }, (_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <RadioGroupItem id={`priority-${index}`} value={String(index + 1)} />
                      <Label htmlFor={`priority-${index}`}>{index + 1}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="progress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Progress
                </FieldLabel>
                <Slider
                  min={PROGRESS_MIN}
                  max={PROGRESS_MAX}
                  step={PROGRESS_STEP}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Status
                </FieldLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="not started"
                  value={field.value}
                >
                  {TICKET_STATUS.map(({ name, value }, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <RadioGroupItem id={`status-${index}`} value={value} />
                      <Label htmlFor={`status-${index}`}>{name}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="mt-5 w-full hover:cursor-pointer">
          {isEditMode ? 'Update Ticket' : 'Create Ticket'}
        </Button>
      </form>
    </div>
  );
}
