import { TicketCard } from "@/components/ticket-card";

const getTickets = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/tickets", {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch topics");

    return response.json();
  } catch (error) {
    console.log("Error loading topics:", error);
  }
};

export default async function Home() {
  const data = await getTickets();

  if (!data?.tickets) {
    return <p>No tickets.</p>;
  }

  const tickets = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2 className="mb-2">{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, index) => (
                    <TicketCard tickets={filteredTicket} key={index} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
