import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),

  getProductById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findUnique({
        where: {
          id: input.id
        },
        include: {
          category: true
        }
      });
    }),

  getCategoryCount: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.category.count();
    }),
});
