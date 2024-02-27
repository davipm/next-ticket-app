"use client";

import { TicketCard } from "@/components/ticket-card";
import { useTickets } from "@/hooks/use-tickets";
import { useCallback, useMemo } from "react";

export function TicketsList() {
  const { data, isPending, isError } = useTickets();

  const uniqueCategories = useMemo(() => {
    return [...new Set(data?.map(({ category }) => category))];
  }, [data]);

  const categoryList = useCallback(
    (category) => {
      return data?.filter((ticket) => ticket.category === category);
    },
    [data]
  );

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
          <h2 className="text-3xl font-bold">{uniqueCategory}</h2>
          <div className="grid-cols-2 lg:grid xl:grid-cols-4">
            {categoryList(uniqueCategory).map((filteredTicket, index) => (
              <TicketCard tickets={filteredTicket} key={index} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
