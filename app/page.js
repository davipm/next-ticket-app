import { TicketsList } from "@/components/tickets-list";

async function getAllTickets() {
  const response = await fetch("http://localhost:3000/api/tickets", { next: { revalidate: 0 } });
  return response.json();
}

export default async function Home() {
  const ticket = await getAllTickets();

  if (ticket.length === 0) {
    return <p>No Data...</p>;
  }

  return (
    <div className="p-5">
      <TicketsList data={ticket} />
    </div>
  );
}
