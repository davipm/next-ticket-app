"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const startingTicketData = {
  title: "",
  description: "",
  priority: 1,
  progress: 0,
  status: "not started",
  category: "Hardware Problem",
};

const categories = [
  "Hardware Problem",
  "Software Problem",
  "Application Deveopment",
  "Project",
];

export function EditTicketForm({ ticket }) {
  const EDIT_MODE = ticket.id !== "new";
  const router = useRouter();

  if (EDIT_MODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const onChange = (event) => {
    const { value } = event.target;
    const { name } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `/api/tickets/${EDIT_MODE ? ticket._id : ""}`,
      {
        method: EDIT_MODE ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      },
    );

    if (!response.ok)
      throw new Error(`Failed to ${EDIT_MODE ? "update" : "create"} ticket`);

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 w-1/2">
        <h3>{EDIT_MODE ? "Update Your Ticket" : "Create New Ticket"}</h3>

        {/* TODO: finish the Form */}
      </form>
    </div>
  );
}
