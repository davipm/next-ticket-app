import { EditTicketForm } from "@/components/edit-ticket-form";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch topic");

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

let updateTicketData = {};

export default async function Ticket({ params: { id } }) {
  const ticket = await getTicketById(id)

  return <EditTicketForm ticket={ticket.foundTicket} />;
}
