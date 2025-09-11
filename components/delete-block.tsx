'use client';

import { useDeleteTicket } from '@/app/(root)/tickets/_services/use-mutations';
import { X } from 'lucide-react';

export default function DeleteBlock({ id }: { id: number }) {
  const { mutate: deleteTicketMutation } = useDeleteTicket();

  return (
    <X
      className="cursor-pointer text-red-400 transition hover:text-red-200"
      onClick={() => deleteTicketMutation(id)}
      size={25}
    />
  );
}
