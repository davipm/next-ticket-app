import { TicketCard } from '@/app/(root)/tickets/_components/ticked-card';
import { getTickets } from '@/app/(root)/tickets/_services/services';
import { Ticket } from '@/generated/prisma';

async function getTicketsAndCategory() {
  const tickets = await getTickets();
  const safeData = Array.isArray(tickets) ? tickets : [];

  const categoryMap = safeData.reduce(
    (map, ticket) => {
      if (!map[ticket.category]) {
        map[ticket.category] = [];
      }
      map[ticket.category].push(ticket);
      return map;
    },
    {} as Record<string, Ticket[]>,
  );

  const uniqueCategories = Object.keys(categoryMap);

  return { tickets, categoryMap, uniqueCategories };
}

export default async function Home() {
  const { tickets, categoryMap, uniqueCategories } = await getTicketsAndCategory();

  return (
    <div className="p-5">
      {tickets.length === 0 ? (
        <div className="text-center">No tickets found.</div>
      ) : (
        uniqueCategories.map((category) => (
          <div key={category} className="mb-4">
            <h2 className="mb-2 text-3xl font-bold">{category}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categoryMap[category].map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
