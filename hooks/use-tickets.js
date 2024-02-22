import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tickets");
      return data;
    },
  });
};
