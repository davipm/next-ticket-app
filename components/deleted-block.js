"use client";

import axios from "axios";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export function DeletedBlock({ id }) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/tickets/${id}`);
    },
    onSuccess: () => {
      router.refresh();
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
