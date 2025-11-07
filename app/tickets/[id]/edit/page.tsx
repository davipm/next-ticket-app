import { TicketForm } from '@/components/ticket-form';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  });

  return <TicketForm id={id} ticketToEdit={ticket} />;
}
