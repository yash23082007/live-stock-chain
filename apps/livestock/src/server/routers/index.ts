import { router } from "../trpc";
import { authRouter } from "./auth";
import { animalsRouter } from "./animals";
import { healthRouter } from "./health";
import { farmsRouter } from "./farms";
import { analyticsRouter } from "./analytics";

export const appRouter = router({
  auth: authRouter,
  animals: animalsRouter,
  health: healthRouter,
  farms: farmsRouter,
  analytics: analyticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
