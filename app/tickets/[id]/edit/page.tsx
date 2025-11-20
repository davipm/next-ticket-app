import { TicketForm } from '@/components/ticket-form';
import { prisma } from '@/server/prisma';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
  });

  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-5 text-3xl font-bold text-center">Update your ticket</h3>
      <TicketForm id={id} ticketToEdit={ticket} />
    </div>
  );
}
