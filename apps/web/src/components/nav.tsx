"use client";

import Link from "next/link";
import { Home, TicketPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function Nav() {
  const { data: checkApi } = useQuery(orpc.healthCheck.queryOptions());

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Home size={25} className="stroke-white" />
        </Link>
        <Link href="/tickets/new">
          <TicketPlus size={25} className="stroke-white" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <p className="text-default-text">davi.p.m94@gmail.com</p>
        <div
          className={`h-2 w-2 rounded-full ${checkApi ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>
    </nav>
  );
}
