import { createTRPCRouter } from '../trpc';
import { animalsRouter } from './animals';
import { farmsRouter } from './farms';

export const appRouter = createTRPCRouter({
  animals: animalsRouter,
  farms: farmsRouter,
});

export type AppRouter = typeof appRouter;
