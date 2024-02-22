"use client";

import { TicketCard } from "@/components/ticket-card";
import { useTickets } from "@/hooks/use-tickets";

export function TicketsList() {
  const { data, isPending, isError } = useTickets();

  const uniqueCategories = [...new Set(data?.map(({ category }) => category))];

  const categoryList = (category) => {
    return data?.filter((ticket) => ticket.category === category);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error...</span>;
  }

  return (
    <>
      {uniqueCategories.map((uniqueCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          <h2 className="font-bold text-3xl">{uniqueCategory}</h2>
          <div className="lg:grid grid-cols-2 xl:grid-cols-4">
            {categoryList(uniqueCategory).map((filteredTicket, index) => (
              <TicketCard tickets={filteredTicket} key={index} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
