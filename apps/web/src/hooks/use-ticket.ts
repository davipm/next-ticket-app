import { orpc } from '@/utils/orpc';
import { useQuery } from '@tanstack/react-query';

export const useTickets = () => {
  const { data: tickets = [], ...rest } = useQuery(
    orpc.ticket.getAll.queryOptions({
      staleTime: 1000 * 60 * 5,
    }),
  );
  return { tickets, total: tickets.length, ...rest };
};
