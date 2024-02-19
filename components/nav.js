import Link from "next/link";
import { Home, TicketPlus } from "lucide-react";

export function Nav() {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Home size={25} className="stroke-white" />
        </Link>
        <Link href="/create-ticket">
          <TicketPlus size={25} className="stroke-white" />
        </Link>
      </div>

      <div>
        <p className="text-default-text">davi.p.m94@gmail.com</p>
      </div>
    </nav>
  );
}
