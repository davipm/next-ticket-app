import { z } from 'zod';

export const ticketSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.number().min(1).max(5),
  progress: z.number().min(0).max(100),
  category: z.string().min(1),
  status: z.string().min(1),
});

export type TicketSchema = z.infer<typeof ticketSchema>;
