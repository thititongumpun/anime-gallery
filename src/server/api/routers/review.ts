import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({

  getReviews: publicProcedure
    .input(z.object({ productId: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.review.findMany({
        where: {
          product_id: input.productId
        }
      });
    }),

  getReviewsBatch: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        productId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;
      const items = await ctx.prisma.review.findMany({
        orderBy: {
          date: "desc",
        },
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          product_id: input.productId
        }
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  createReview: publicProcedure
    .input(z.object({
      productId: z.string(),
      username: z.string(),
      rating: z.number(),
      message: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.review.create({
        data: {
          product_id: input.productId,
          username: ctx.session?.user.name as string || input.username,
          rating: input.rating,
          message: input.message
        }
      });
    }),
});
