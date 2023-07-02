import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getProducts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        category: true
      }
    });
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

  create: protectedProcedure
    .input(z.object({
      categoryId: z.string(),
      product_name: z.string(),
      description: z.string(),
      image_url: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          categoryId: input.categoryId,
          product_name: input.product_name,
          description: input.description,
          image_url: input.image_url,
          publishedBy: ctx.session.user.name as string,
        }
      });
    })
});
