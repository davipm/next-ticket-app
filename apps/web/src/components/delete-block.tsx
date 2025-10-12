'use client';

import { orpc } from '@/utils/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export function DeleteBlock({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutate: deleteTicketMutation, isPending } = useMutation(
    orpc.ticket.delete.mutationOptions({
      onSuccess: async () => {
        toast.success(`Ticket ${id} deleted successfully.`);
        await queryClient.invalidateQueries({
          queryKey: orpc.ticket.key({ type: 'query' }),
        });
      },
    }),
  );

  if (isPending) {
    return <div>Deleting...</div>;
  }

  return (
    <X
      className="cursor-pointer text-red-400 transition hover:text-red-200"
      onClick={() => deleteTicketMutation({ id })}
      size={25}
    />
  );
}
