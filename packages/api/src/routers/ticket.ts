import prisma from '@next-ticket-app/db';
import {
  createTicketSchema,
  ticketIdSchema,
  ticketSchema,
  updateTicketSchema,
} from '@next-ticket-app/schemas';
import { ORPCError } from '@orpc/server';
import { z } from 'zod';

import { publicProcedure } from '../index';

export const ticketRouter = {
  getAll: publicProcedure
    .route({ method: 'GET', path: '/ticket' })
    .output(z.object({ tickets: z.array(ticketSchema), total: z.number() }))
    .handler(async () => {
      const [tickets, total] = await prisma.$transaction([
        prisma.ticket.findMany(),
        prisma.ticket.count(),
      ]);

      return {
        tickets,
        total,
      };
    }),

  find: publicProcedure
    .route({ method: 'GET', path: '/ticket/{id}' })
    .input(ticketIdSchema)
    .output(ticketSchema)
    .handler(async ({ input }) => {
      const ticket = await prisma.ticket.findUnique({
        where: { id: input.id },
      });

      if (!ticket) {
        throw new ORPCError('NOT_FOUND', {
          message: `Ticket with id ${input.id} not found`,
        });
      }

      return ticket;
    }),

  create: publicProcedure
    .route({ method: 'POST', path: '/ticket' })
    .input(createTicketSchema)
    .output(ticketSchema)
    .handler(async ({ input }) => {
      return prisma.ticket.create({
        data: input,
      });
    }),

  update: publicProcedure
    .route({ method: 'PUT', path: '/ticket/{id}' })
    .input(updateTicketSchema)
    .output(ticketSchema)
    .handler(async ({ input }) => {
      const ticket = await prisma.ticket.findUnique({
        where: { id: input.id },
      });

      if (!ticket) {
        throw new ORPCError('NOT_FOUND', {
          message: `Ticket with id ${input.id} not found`,
        });
      }

      return prisma.ticket.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  delete: publicProcedure
    .route({ method: 'DELETE', path: '/ticket/{id}' })
    .input(ticketIdSchema)
    .output(ticketSchema)
    .handler(async ({ input }) => {
      const ticket = await prisma.ticket.findUnique({
        where: { id: input.id },
      });

      if (!ticket) {
        throw new ORPCError('NOT_FOUND', {
          message: `Ticket with id ${input.id} not found`,
        });
      }

      return prisma.ticket.delete({
        where: { id: input.id },
      });
    }),
};
