import { orpc } from '@/utils/orpc';
import type { Ticket } from '@next-ticket-app/types';
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

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  const { mutate: createTicketMutation, ...rest } = useMutation(
    orpc.ticket.create.mutationOptions({
      onMutate: async (task) => {
        await queryClient.cancelQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        const previousTickets = queryClient.getQueriesData<Ticket[]>({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        queryClient.setQueriesData(
          { queryKey: orpc.ticket.key({ type: 'query' }) },
          (old: Ticket[]) => {
            return old ? [...old, { id: Math.random().toString(), ...task }] : [task];
          },
        );

        return { previousTickets };
      },
      onError: (error, { title }, context) => {
        if (context?.previousTickets) {
          context.previousTickets.forEach(([queryKey, data]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }

        toast.error(`Failed to create ticket ${title}. Please try again.`);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });
      },
    }),
  );

  return { createTicketMutation, ...rest };
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTicketMutation, ...rest } = useMutation(
    orpc.ticket.update.mutationOptions({
      onMutate: async ({ id, data }) => {
        await queryClient.cancelQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        const previousTickets = queryClient.getQueriesData({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        queryClient.setQueryData<Ticket[]>(orpc.ticket.getAll.queryKey(), (old) => {
          if (!old) return old;
          return old.map((ticket) => (ticket.id === id ? { ...ticket, ...data } : ticket));
        });

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
          queryKey: orpc.ticket.getAll.queryKey(),
        });
      },
    }),
  );

  return { updateTicketMutation, ...rest };
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

        queryClient.setQueriesData(
          { queryKey: orpc.ticket.key({ type: 'query' }) },
          (old: Ticket[]) => {
            if (!old) return old;
            return old.filter((ticket: Ticket) => ticket.id !== id);
          },
        );

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
