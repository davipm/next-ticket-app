"use client";

import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function DeletedBlock({ id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/tickets/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket was removed!");
      router.refresh();
    },
  });

  return <X className="cursor-pointer text-red-400 transition hover:text-red-200" onClick={mutate} size={25} />;
}
