import { orpc } from '@/utils/orpc';
import { useQuery } from '@tanstack/react-query';

export const useTickets = () => {
  const { data: tickets = [], ...rest } = useQuery(orpc.ticket.getAll.queryOptions());
  return { tickets, total: tickets.length, ...rest };
};
