import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const farmsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      location: z.string().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user as any;
      return ctx.prisma.farm.create({
        data: {
          name: input.name,
          location: input.location,
          ownerId: user.id
        }
      });
    }),
  
  getDashboard: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.session.user as any;
      return ctx.prisma.farm.findFirst({
        where: { ownerId: user.id },
        include: { animals: true }
      });
    })
});
