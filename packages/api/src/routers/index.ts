import type { RouterClient } from '@orpc/server';

import { publicProcedure } from '../index';
import { ticketRouter } from './ticket';

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK';
  }),
  ticket: ticketRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
