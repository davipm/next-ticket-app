'use client';

import { DeleteBlock } from '@/components/delete-block';
import { PriorityDisplay } from '@/components/priority-display';
import { ProgressDisplay } from '@/components/progress-display';
import { StatusDisplay } from '@/components/status-display';
import type { Ticket } from "@next-ticket-app-1/api/types/ticket";
import Link from 'next/link';

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export function TicketCard({
  priority,
  description,
  progress,
  status,
  createdAt,
  id,
  title,
}: Ticket) {
  const createDateTime = new Date(createdAt).toLocaleString('en-US', dateTimeFormatOptions);

  return (
    <div className="m-2 flex flex-col rounded-md bg-custom-card p-3 shadow-lg transition duration-300 ease-in-out hover:bg-card-hover">
      <div className="mb-3 flex">
        <PriorityDisplay priority={priority} />
        <div className="ml-auto">
          <DeleteBlock id={id} />
        </div>
      </div>

      <Link href={`/tickets/${id}/edit`} className="contents">
        <h4 className="mb-1">{title}</h4>
        <hr className="mb-2 h-px border-0 bg bg-page" />
        <p>{description}</p>

        <div className="grow" />

        <div className="mt-2 flex">
          <div className="flex flex-col">
            <p className="my-1 text-xs">{createDateTime}</p>
            <ProgressDisplay progress={progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={status} />
          </div>
        </div>
      </Link>
    </div>
  );
}
