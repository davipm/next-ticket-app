'use client';

import { useQuery } from '@tanstack/react-query';
import { Home, TicketPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { useTickets } from '@/hooks/use-ticket';
import { orpc } from '@/utils/orpc';

export function Nav() {
  const { total } = useTickets();
  const { data: checkApi } = useQuery(orpc.healthCheck.queryOptions());

  return (
    <nav className="flex justify-between bg-white shadow-lg dark:bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Home size={25} />
        </Link>
        <Link href="/tickets/new">
          <TicketPlus size={25} />
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Image src="/vercel.svg" alt="Logo" width={15} height={15} />
        <p className="text-default-text">davi.p.m94@gmail.com has {total} tickets</p>
        <div className={`h-2 w-2 rounded-full ${checkApi ? 'bg-green-500' : 'bg-red-500'}`} />
        <ModeToggle />
      </div>
    </nav>
  );
}
