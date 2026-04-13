import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const animalsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      tagNumber: z.string().min(1),
      species: z.string(),
      breed: z.string().optional(),
      gender: z.enum(['male', 'female', 'unknown']),
      farmId: z.string().uuid()
    }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user as any;
      const animal = await ctx.prisma.animal.create({
        data: {
          ...input,
          currentOwnerId: user.id,
        }
      });
      return animal;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const animal = await ctx.prisma.animal.findUnique({
        where: { id: input.id },
        include: {
          healthEvents: { orderBy: { eventDate: 'desc' } },
        }
      });
      return animal;
    }),
});
