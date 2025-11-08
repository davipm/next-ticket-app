import { ORPCError } from '@orpc/server';
import z from 'zod';
import { formTicketSchema, ticketIdSchema, ticketSchema, updateTicketSchema } from '@/lib/types';
import { publicProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';

export const ticketRouter = {
  getAll: publicProcedure
    .route({ method: 'GET', path: '/tickets' })
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
    .route({ method: 'GET', path: '/tickets/{id}' })
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
    .route({ method: 'POST', path: '/tickets' })
    .input(formTicketSchema)
    .output(ticketSchema)
    .handler(async ({ input }) => {
      return prisma.ticket.create({
        data: input,
      });
    }),

  update: publicProcedure
    .route({ method: 'PUT', path: '/tickets/{id}' })
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
    .route({ method: 'DELETE', path: '/tickets/{id}' })
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
