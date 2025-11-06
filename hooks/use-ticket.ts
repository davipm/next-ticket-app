import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { TicketSchema, TicketsResponse } from '@/lib/types';
import { orpc } from '@/utils/orpc';

export const useTickets = () => {
  const { data, ...rest } = useQuery(
    orpc.ticket.getAll.queryOptions({
      staleTime: 1000 * 60 * 5,
    }),
  );

  return {
    tickets: data?.tickets || [],
    total: data?.total || 0,
    ...rest,
  };
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  const { mutate: createTicketMutation, ...rest } = useMutation(
    orpc.ticket.create.mutationOptions({
      onMutate: async (task) => {
        await queryClient.cancelQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        const previousTickets = queryClient.getQueriesData<TicketSchema[]>({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });

        queryClient.setQueriesData(
          { queryKey: orpc.ticket.key({ type: 'query' }) },
          (old: TicketsResponse) => {
            if (!old) return old;
            return {
              ...old,
              tickets: [...old.tickets, { ...task, id: Math.random().toString() }],
              total: old.total + 1,
            };
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

        queryClient.setQueriesData(
          { queryKey: orpc.ticket.key({ type: 'query' }) },
          (old: TicketsResponse) => {
            if (!old) return old;
            return {
              ...old,
              tickets: old.tickets.map((item) => (item.id === id ? { ...item, ...data } : item)),
            };
          },
        );

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
          (old: TicketsResponse) => {
            if (!old) return old;
            return {
              ...old,
              tickets: old.tickets.filter((task) => task.id !== id),
              total: old.total - 1,
            };
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
