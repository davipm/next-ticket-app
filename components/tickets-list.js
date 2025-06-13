"use client";

import { useMemo } from "react";
import { TicketCard } from "@/components/ticket-card";

/**
 * Renders a list of tickets grouped by their category.
 * Uses memoization to efficiently process and categorize the ticket data.
 * Each category is displayed with its own heading and a grid of TicketCard components.
 *
 * @param {Object} props
 * @param {Array} props.data - Array of ticket objects to display.
 * @returns {JSX.Element} The categorized ticket list UI.
 */
export function TicketsList({ data }) {
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const categoryMap = useMemo(() => {
    const map = {};
    safeData.forEach((ticket) => {
      if (!map[ticket.category]) map[ticket.category] = [];
      map[ticket.category].push(ticket);
    });
    return map;
  }, [safeData]);

  const uniqueCategories = useMemo(() => Object.keys(categoryMap), [categoryMap]);

  return (
    <>
      {uniqueCategories.map((uniqueCategory) => (
        <div key={uniqueCategory} className="mb-4">
          <h2 className="text-3xl font-bold">{uniqueCategory}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {categoryMap[uniqueCategory].map((filteredTicket) => (
              <TicketCard tickets={filteredTicket} key={filteredTicket.id} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
