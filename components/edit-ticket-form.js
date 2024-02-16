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
  "Application Development",
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

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={onChange}
          required={true}
          value={formData.title}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          onChange={onChange}
          required={true}
          value={formData.description}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          value={formData.category}
        >
          {categories?.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          {Array.from({ length: 5 }, (_, index) => (
            <>
              <input
                type="radio"
                name="priority"
                id={`priority-${index + 1}`}
                onChange={onChange}
                value={index + 1}
                checked={formData.priority === index + 1}
              />
              <label htmlFor="prioarity-1">{index + 1}</label>
            </>
          ))}
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={onChange}
        />

        <label>Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <button type="submit" className="btn max-w-xs">
          {EDIT_MODE ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
