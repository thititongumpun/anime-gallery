import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const productAdminRouter = createTRPCRouter({
  getProducts: protectedProcedure
    .input(z.object({ categoryId: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.product.findMany({
        select: {
          id: true,
          product_name: true,
          amount: true,
          is_new: true,
          is_bestseller: true,
          category: {
            select: {
              category_name: true
            }
          },
        },
        where: {
          categoryId: input.categoryId || undefined
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
      amount: z.coerce.number(),
      image_url: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          categoryId: input.categoryId,
          product_name: input.product_name,
          description: input.description,
          amount: input.amount,
          image_url: input.image_url,
          publishedBy: ctx.session.user.name as string,
        }
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string(), }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.product.delete({
        where: {
          id: input.id
        }
      });
    }),
});
