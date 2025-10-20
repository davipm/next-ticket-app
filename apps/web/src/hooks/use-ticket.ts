import { orpc } from '@/utils/orpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useTickets = () => {
  const { data: tickets = [], ...rest } = useQuery(
    orpc.ticket.getAll.queryOptions({
      staleTime: 1000 * 60 * 5,
    }),
  );
  return { tickets, total: tickets.length, ...rest };
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTicketMutation, ...rest } = useMutation(
    orpc.ticket.delete.mutationOptions({
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        const previousTickets = queryClient.getQueriesData({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        queryClient.setQueriesData({ queryKey: orpc.ticket.key({ type: 'query' }) }, (old: any) => {
          if (!old) return old;

          // Handle array of tickets
          if (Array.isArray(old)) {
            return old.filter((ticket: any) => ticket.id !== id);
          }

          // Handle object with tickets property
          if (old.tickets && Array.isArray(old.tickets)) {
            return {
              ...old,
              tickets: old.tickets.filter((ticket: any) => ticket.id !== id),
            };
          }

          return old;
        });

        toast.success(`Ticket ${id} deleted successfully.`);
        return { previousTickets };
      },
      onError: (error, { id }, context) => {
        if (context?.previousTickets) {
          context.previousTickets.forEach(([queryKey, data]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }

        toast.error(`Failed to delete ticket ${id}. Please try again.`);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });
      },
    }),
  );

  return { deleteTicketMutation, ...rest };
};
