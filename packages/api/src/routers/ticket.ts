import prisma from '@next-ticket-app-1/db';
import { z } from 'zod';

import { publicProcedure } from '../index';
import { ticketSchema } from '../schema/schema';

export const ticketRouter = {
  getAll: publicProcedure.handler(() => {
    return prisma.ticket.findMany();
  }),

  find: publicProcedure.input(z.object({ id: z.string() })).handler(({ input }) => {
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
    .input(z.object({ id: z.string(), data: ticketSchema }))
    .handler(async ({ input }) => {
      return prisma.ticket.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .route({ method: 'DELETE', path: '/ticket/{id}' })
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      return prisma.ticket.delete({
        where: { id: input.id },
      });
    }),
};
