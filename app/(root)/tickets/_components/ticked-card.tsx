'use client';

import DeleteBlock from '@/components/delete-block';
import { PriorityDisplay } from '@/components/priority-display';
import ProgressDisplay from '@/components/progress-display';
import StatusDisplay from '@/components/status-display';
import { Ticket } from '@/generated/prisma';
import Link from 'next/link';

const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

type Props = {
  ticket: Ticket;
};

export function TicketCard({ ticket }: Props) {
  const createDateTime = new Date(ticket.createdAt).toLocaleString('en-US', dateTimeFormatOptions);

  return (
    <div className="m-2 flex flex-col rounded-md bg-custom-card p-3 shadow-lg transition duration-300 ease-in-out hover:bg-card-hover">
      <div className="mb-3 flex">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket.id} />
        </div>
      </div>

      <Link href={`/tickets/edit/${ticket.id}`} className="contents">
        <h4 className="mb-1">{ticket.title}</h4>
        <hr className="mb-2 h-px border-0 bg bg-page" />
        <p>{ticket.description}</p>

        <div className="grow" />

        <div className="mt-2 flex">
          <div className="flex flex-col">
            <p className="my-1 text-xs">{createDateTime}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
}
