import { TicketForm } from '@/components/ticket-form';

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-5 text-3xl font-bold text-center">Create new Ticket</h3>
      <TicketForm />
    </div>
  );
}
