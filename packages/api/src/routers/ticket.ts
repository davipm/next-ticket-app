import prisma from '@next-ticket-app/db';
import { ticketIdSchema, ticketSchema, updateTicketSchema } from '@next-ticket-app/schemas';

import { publicProcedure } from '../index';

export const ticketRouter = {
  getAll: publicProcedure.handler(async () => {
    const [tickets, total] = await prisma.$transaction([
      prisma.ticket.findMany(),
      prisma.ticket.count(),
    ]);

    return {
      tickets,
      total,
    };
  }),

  find: publicProcedure.input(ticketIdSchema).handler(({ input }) => {
    return prisma.ticket.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  create: publicProcedure
    .route({ method: 'POST', path: '/ticket' })
    .input(ticketSchema)
    .handler(async ({ input }) => {
      return prisma.ticket.create({
        data: input,
      });
    }),

  update: publicProcedure
    .route({ method: 'PUT', path: '/ticket/{id}' })
    .input(updateTicketSchema)
    .handler(async ({ input }) => {
      return prisma.ticket.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .route({ method: 'DELETE', path: '/ticket/{id}' })
    .input(ticketIdSchema)
    .handler(async ({ input }) => {
      return prisma.ticket.delete({
        where: { id: input.id },
      });
    }),
};
