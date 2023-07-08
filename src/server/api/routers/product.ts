import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({

  getProductsShow: publicProcedure
    .query(async ({ ctx, }) => {
      return await ctx.prisma.product.findMany({});
    }),

  getProductById: publicProcedure
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
});
