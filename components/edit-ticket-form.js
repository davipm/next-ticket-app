"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const categories = [
  "Hardware Problem",
  "Software Problem",
  "Application Development",
  "Project",
];

export function EditTicketForm({ ticket }) {
  const EDIT_MODE = ticket._id !== "new";
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: EDIT_MODE ? ticket.title : "",
      description: EDIT_MODE ? ticket.description : "",
      priority: EDIT_MODE ? ticket.priority : 1,
      progress: EDIT_MODE ? ticket.progress : 0,
      status: EDIT_MODE ? ticket.status : "not started",
      category: EDIT_MODE ? ticket.category : "Hardware Problem",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (formData) => {
      axios({
        method: EDIT_MODE ? "put" : "post",
        url: `/api/tickets/${EDIT_MODE ? ticket._id : ""}`,
        data: JSON.stringify({ formData }),
      });
    },
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      console.log(`Failed to ${EDIT_MODE ? "update" : "create"} ticket`);
    },
  });

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(mutate)}
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDIT_MODE ? "Update Your Ticket" : "Create New Ticket"}</h3>

        <label htmlFor="title">Title</label>
        <input type="text" {...register("title", { required: true })} />

        <label htmlFor="description">Description</label>
        <textarea
          cols="30"
          rows="5"
          {...register("description", { required: true })}
        />

        <label htmlFor="category">Category</label>
        <select name="category" id="category" {...register("category")}>
          {categories?.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          {Array.from({ length: 5 }, (_, index) => (
            <label htmlFor={`priority-${index + 1}`} key={index}>
              <input
                type="radio"
                value={index + 1}
                defaultChecked={parseInt(watch("priority")) === index + 1}
                {...register("priority")}
              />
              {index + 1}
            </label>
          ))}
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          {...register("progress", { min: 0, max: 100, required: true })}
        />

        <label>Status</label>
        <select name="status" id="status" {...register("status")}>
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
