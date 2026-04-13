import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.session?.user;
  }),

  connectWallet: protectedProcedure
    .input(z.object({ walletAddress: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      // TODO: Connect wallet to user
      return { success: true };
    }),
});
