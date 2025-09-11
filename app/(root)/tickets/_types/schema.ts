import { z } from 'zod';

export const ticketSchema = z.intersection(
  z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    priority: z.number().min(1).max(5),
    progress: z.number().min(0).max(100),
    category: z.string().min(1),
    status: z.string().min(1),
  }),
  z.discriminatedUnion('action', [
    z.object({ action: z.literal('create') }),
    z.object({ action: z.literal('update'), id: z.number().min(1) }),
  ]),
);

export type TicketSchema = z.infer<typeof ticketSchema>;

export const ticketDefaultValues: TicketSchema = {
  action: 'create',
  title: '',
  description: '',
  priority: 1,
  progress: 0,
  category: 'Hardware Problem',
  status: 'not started',
};
