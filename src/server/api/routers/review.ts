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
          productId: input.productId
        }
      });
    }),

  // getReviews: publicProcedure
  //   .input(
  //     z.object({
  //       limit: z.number(),
  //       cursor: z.string().nullish(),
  //       skip: z.number().optional(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const { limit, skip, cursor } = input;
  //     const items = await ctx.prisma.product.findMany({
  //       orderBy: {
  //         publishedAt: "desc",
  //       },
  //       take: limit + 1,
  //       skip: skip,
  //       cursor: cursor ? { id: cursor } : undefined,
  //     });
  //     let nextCursor: typeof cursor | undefined = undefined;
  //     if (items.length > limit) {
  //       const nextItem = items.pop(); // return the last item from the array
  //       nextCursor = nextItem?.id;
  //     }
  //     return {
  //       items,
  //       nextCursor,
  //     };
  //   }),

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
          productId: input.productId,
          username: input.username || ctx.session?.user.name as string,
          rating: input.rating,
          message: input.message
        }
      });
    }),
});
