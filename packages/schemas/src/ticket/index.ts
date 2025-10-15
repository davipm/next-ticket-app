import type { TicketDefault } from '@next-ticket-app/types';
import { z } from 'zod';

export const ticketSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.number().min(1).max(5),
  progress: z.number().min(0).max(100),
  category: z.string().min(1),
  status: z.string().min(1),
});

export const ticketIdSchema = z.object({
  id: z.string().min(1),
});

export const updateTicketSchema = z.object({
  id: z.string().min(1),
  data: ticketSchema,
});

export type TicketSchema = z.infer<typeof ticketSchema>;
export type TicketSchemaID = z.infer<typeof ticketIdSchema>;
export type UpdateTicketSchema = z.infer<typeof updateTicketSchema>;

export const ticketDefaultValues: TicketDefault = {
  title: '',
  description: '',
  priority: 1,
  progress: 0,
  category: 'Hardware Problem',
  status: 'not started',
};
