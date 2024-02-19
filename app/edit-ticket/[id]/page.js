import { getTicketByID } from "@/lib/actions";
import { EditTicketForm } from "@/components/edit-ticket-form";

export default async function Ticket({ params: { id } }) {
  const ticket = await getTicketByID(id);

  return <EditTicketForm ticket={ticket} />;
}
