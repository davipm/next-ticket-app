"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TicketCard } from "@/components/ticket-card";

export function TicketsList() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tickets");
      return data;
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error...</span>;
  }

  const uniqueCategories = [
    ...new Set(data.tickets.map(({ category }) => category)),
  ];

  return (
    <div>
      {data.tickets &&
        uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {data.tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, index) => (
                  <TicketCard tickets={filteredTicket} key={index} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
