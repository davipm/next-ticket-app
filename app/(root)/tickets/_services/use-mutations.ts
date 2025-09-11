import { deleteTicket, saveTicket } from '@/app/(root)/tickets/_services/services';
import { TicketSchema } from '@/app/(root)/tickets/_types/schema';
import { Ticket } from '@/generated/prisma';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSaveTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<Ticket, Error, TicketSchema>({
    mutationKey: ['tickets', 'save'],
    mutationFn: (data) => saveTicket(data),
    onSuccess: async (_, { action }) => {
      toast.success(`Ticket ${action === 'create' ? 'created' : 'updated'} successfully.`);
      await queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create Ticket.');
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationKey: ['tickets', 'delete'],
    mutationFn: async (id) => {
      await deleteTicket(id);
    },
    onSuccess: async () => {
      toast.success('Ticket deleted successfully.');
      await queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to deleted Ticket.');
    },
  });
};
