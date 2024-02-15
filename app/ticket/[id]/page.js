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

export default async function Ticket({ params }) {
  const EDIT_MODE = params.id !== "new";

  if (EDIT_MODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = { _id: "new" };
  }

  return <EditTicketForm ticket={updateTicketData} />;
}
