import { getTicket, getTickets } from '@/app/(root)/tickets/_services/services';
import { useQuery } from '@tanstack/react-query';

export const useTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });
};

export const useTicket = (id: number) => {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicket(id),
    enabled: !!id,
  });
};
