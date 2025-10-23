export interface Ticket {
  progress: number;
  title: string;
  id: string;
  description: string;
  category: string;
  priority: number;
  status: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketsResponse {
  tickets: Ticket[];
  total: number;
}

export interface TicketDefault {
  title: string;
  description: string;
  priority: number;
  progress: number;
  category: string;
  status: string;
}
