import z from 'zod';

export const ticketBaseSchema = z.object({
  title: z
    .string()
    .min(1, 'Author name is required')
    .max(100, 'Author name must be less than 100 characters'),
  description: z.string().max(500, 'Biography must be less than 500 characters'),
  priority: z.number().min(1).max(5),
  progress: z.number().min(0).max(100),
  category: z.string(),
  status: z.string(),
});

export const createTicketSchema = ticketBaseSchema;

export const updateTicketSchema = z.object({
  id: z.string(),
  data: ticketBaseSchema.partial(),
});

export const ticketIdSchema = z.object({
  id: z.string(),
});

export const ticketResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.number(),
  progress: z.number(),
  category: z.string(),
  status: z.string(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TicketBaseSchema = z.infer<typeof ticketBaseSchema>;
export type CreateTicketSchema = z.infer<typeof createTicketSchema>;
export type UpdateTicketSchema = z.infer<typeof updateTicketSchema>;
export type TicketIdSchema = z.infer<typeof ticketIdSchema>;
export type TicketResponseSchema = z.infer<typeof ticketResponseSchema>;
export type TicketsResponse = {
  tickets: TicketResponseSchema[];
  total: number;
};
