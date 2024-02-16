import { TicketsList } from "@/components/tickets-list";

export default async function Home() {
  return (
    <div className="p-5">
      <TicketsList />
    </div>
  );
}
