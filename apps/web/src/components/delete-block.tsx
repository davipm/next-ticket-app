'use client';

import { useDeleteTicket } from '@/hooks/use-ticket';
import { X } from 'lucide-react';

export function DeleteBlock({ id }: { id: string }) {
  const { deleteTicketMutation } = useDeleteTicket();

  return (
    <X
      className="cursor-pointer text-red-400 transition hover:text-red-200"
      onClick={() => deleteTicketMutation({ id })}
      size={25}
    />
  );
}
