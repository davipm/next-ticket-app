'use client';

import { CircleX, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { TicketCard } from '@/components/ticket-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import { useTickets } from '@/hooks/use-ticket';

export default function Home() {
  const { tickets, total, status, isError, refetch } = useTickets();
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
    return (
      <>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex w-full max-w-sm flex-col gap-3 rounded-md border p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="mt-2 flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-90">
        <Alert className="w-full max-w-lg flex flex-row items-start gap-3 border-destructive/80 bg-destructive/5 text-destructive">
          <CircleX className="size-4 shrink-0 translate-y-0.5 text-destructive/60" />
          <div className="flex flex-1 items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-destructive/80">
                There was a problem processing your request. Please try again later.
              </AlertDescription>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                size="sm"
                variant="destructive"
                className="hover:cursor-pointer"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-5">
      {total === 0 ? (
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
            <h2 className="mb-2 text-xl font-semibold text-black dark:text-white ">{category}</h2>
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
