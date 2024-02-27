"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PriorityDisplay } from "@/components/priority-display";
import { DeletedBlock } from "@/components/deleted-block";
import { ProgressDisplay } from "@/components/progress-display";
import { StatusDisplay } from "@/components/status-display";

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export function TicketCard({ tickets }) {
  const createDateTime = useMemo(() => {
    const date = new Date(tickets.createdAt);
    return date.toLocaleString("en-US", options);
  }, [tickets.createdAt]);

  return (
    <div className="m-2 flex flex-col rounded-md bg-custom-card p-3 shadow-lg transition duration-300 hover:bg-card-hover">
      <div className="mb-3 flex">
        <PriorityDisplay priority={tickets.priority} />
        <div className="ml-auto">
          <DeletedBlock id={tickets.id} />
        </div>
      </div>

      <Link href={`/edit-ticket/${tickets.id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{tickets.title}</h4>
        <hr className="mb-2 h-px border-0 bg-page" />
        <p>{tickets.description}</p>

        <div className="flex-grow" />
        <div className="mt-2 flex">
          <div className="flex flex-col">
            <p className="my-1 text-xs">{createDateTime}</p>
            <ProgressDisplay progress={tickets.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={tickets.status} />
          </div>
        </div>
      </Link>
    </div>
  );
}
