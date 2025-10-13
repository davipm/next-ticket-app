'use client';

import { Error } from '@/app/(root)/_components/error';
import { Loading } from '@/app/(root)/_components/loading';
import { TicketCard } from '@/components/ticket-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTicketStore } from '@/store/ticket-store';
import { orpc } from '@/utils/orpc';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2Icon } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export default function Home() {
  const { setTotal } = useTicketStore();
  const { data: tickets = [], isError, status } = useQuery(orpc.ticket.getAll.queryOptions());

  const categoriesMap = useMemo(() => {
    return tickets.reduce(
      (map, ticket) => {
        if (!map[ticket.category]) {
          map[ticket.category] = [];
        }
        map[ticket.category].push(ticket);
        return map;
      },
      {} as Record<string, typeof tickets>,
    );
  }, [tickets]);

  const uniqueCategories = Object.keys(categoriesMap);

  useEffect(() => {
    if (status === 'success') {
      setTotal(tickets.length);
    }
  }, [status, tickets, setTotal]);

  if (status === 'pending') {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="p-5">
      {tickets && tickets.length === 0 ? (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
        </Alert>
      ) : (
        uniqueCategories.map((category) => (
          <div key={category} className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">{category}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categoriesMap[category].map((ticket) => (
                <TicketCard key={ticket.id} {...ticket} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
