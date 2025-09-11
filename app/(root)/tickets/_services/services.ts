'use server';

import { TicketSchema, ticketSchema } from '@/app/(root)/tickets/_types/schema';
import { executeAction } from '@/lib/execute-action';
import prisma from '@/lib/prisma';

export const saveTicket = async (data: TicketSchema) => {
  return executeAction({
    actionFn: () => {
      const input = ticketSchema.parse(data);

      if (input.action === 'create') {
        const { action, ...ticketData } = input;
        return prisma.ticket.create({
          data: ticketData,
        });
      }

      const { action, id, ...ticketData } = input;
      return prisma.ticket.update({
        where: { id },
        data: ticketData,
      });
    },
  });
};

export const deleteTicket = async (id: number) => {
  return executeAction({
    actionFn: () =>
      prisma.ticket.delete({
        where: { id },
      }),
  });
};

export const getTickets = async () => {
  return executeAction({
    actionFn: () => prisma.ticket.findMany(),
  });
};

export const getTicket = async (id: number) => {
  return executeAction({
    actionFn: () => prisma.ticket.findUnique({ where: { id } }),
  });
};
