import { create } from 'zustand'

interface TicketStore {
  total: number;
  setTotal: (total: number) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  total: 0,
  setTotal: (total) => set({ total }),
}))
