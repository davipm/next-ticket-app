'use client';

import { Error } from '@/app/(root)/_components/error';
import { Loading } from '@/app/(root)/_components/loading';
import { TicketCard } from '@/components/ticket-card';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { useTickets } from '@/hooks/use-ticket';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function Home() {
  const { tickets, status, isError } = useTickets();
  const router = useRouter();

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

  if (status === 'pending') {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="p-5">
      {tickets && tickets.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Plus />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>Get started by creating your first project.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="hover:cursor-pointer" onClick={() => router.push('/tickets/new')}>
              <Plus />
              Create Project
            </Button>
          </EmptyContent>
        </Empty>
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
