"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TicketCard } from "@/components/ticket-card";
import { useMemo } from "react";

export function TicketsList() {
  const {
    data: tickets,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tickets");
      return data;
    },
  });

  const uniqueCategories = useMemo(() => {
    if (isPending || isError) return;
    return [...new Set(tickets.map(({ category }) => category))];
  }, [isError, isPending, tickets]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error...</span>;
  }

  return (
    <>
      {tickets &&
        uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2 className="font-bold text-3xl">{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, index) => (
                  <TicketCard tickets={filteredTicket} key={index} />
                ))}
            </div>
          </div>
        ))}
    </>
  );
}
