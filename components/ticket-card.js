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
    <div className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={tickets.priority} />
        <div className="ml-auto">
          <DeletedBlock id={tickets._id} />
        </div>
      </div>

      <Link href={`/edit-ticket/${tickets._id}`} style={{ display: "contents" }}>
        <h4 className="mb-1">{tickets.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p>{tickets.description}</p>

        <div className="flex-grow" />
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{createDateTime}</p>
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
