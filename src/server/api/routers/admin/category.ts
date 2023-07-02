import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getCategorys: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
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

  createProduct: protectedProcedure
    .input(z.object({
      product_name: z.string(),
      description: z.string(),
      image_url: z.string(),
      publishedAt: z.string(),
      publishedBy: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          product_name: input.product_name,
          description: input.description,
          image_url: input.image_url,
          publishedAt: input.publishedAt,
          publishedBy: input.publishedBy,
        }
      });
    })
});
