"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export function DeletedBlock({ id }) {
  const router = useRouter();

  const deleteTicket = async () => {
    const response = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });

    if (response.ok) router.refresh();
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
}
