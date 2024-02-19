"use client";

import axios from "axios";
import { toast } from "sonner";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function DeletedBlock({ id }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/tickets/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket was removed!");
    },
  });

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={mutate}
    />
  );
}
