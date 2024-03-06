"use client";

import { useCallback, useMemo } from "react";
import { TicketCard } from "@/components/ticket-card";

export function TicketsList({ data }) {
  const uniqueCategories = useMemo(() => {
    return [...new Set(data.map(({ category }) => category))];
  }, [data]);

  // prettier-ignore
  const categoryList = useCallback((category) => {
    return data.filter((ticket) => ticket.category === category);
  }, [data]);

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
