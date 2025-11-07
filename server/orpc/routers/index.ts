import type { RouterClient } from '@orpc/server';
import { publicProcedure } from '@/server/orpc';
import { ticketRouter } from '@/server/orpc/routers/ticket';

export const appRouter = {
  ticket: ticketRouter,
  healthCheck: publicProcedure.handler(() => {
    return 'OK';
  }),
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
