import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const createHealthEventInput = z.object({
  animalId: z.string().uuid(),
  eventType: z.enum(["vaccination", "treatment", "checkup", "illness", "injury"]),
  eventDate: z.date(),
  description: z.string().optional(),
  drugName: z.string().optional(),
  dosage: z.string().optional(),
  withdrawalDays: z.number().optional(),
  batchNumber: z.string().optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
  notes: z.string().optional(),
});

export const healthRouter = router({
  createEvent: protectedProcedure
    .input(createHealthEventInput)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // TODO: Create health event
      return {
        id: "health-event-1",
        animalId: input.animalId,
        eventType: input.eventType,
        createdAt: new Date(),
      };
    }),

  getByAnimal: publicProcedure
    .input(z.object({ animalId: z.string().uuid() }))
    .query(async () => {
      // TODO: Fetch health events for animal
      return [];
    }),

  getUpcomingVaccinations: protectedProcedure
    .input(z.object({ farmId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      // TODO: Get upcoming vaccinations
      return [];
    }),

  anchorOnChain: protectedProcedure
    .input(z.object({ eventId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      // TODO: Anchor health record on blockchain
      return { success: true, txHash: "0x..." };
    }),

  getWithdrawalPeriodAnimals: protectedProcedure
    .input(z.object({ farmId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      // TODO: Get all animals currently under withdrawal period
      return [];
    }),
});
