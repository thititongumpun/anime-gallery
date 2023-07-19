import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const orderRouter = createTRPCRouter({

  getOrders: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.order.findMany({
        include: {
          order_item: true
        },
        where: {
          user_id: ctx.session?.user.id
        },
        orderBy: {
          id: "desc"
        }
      });
    }),

  getOrderItems: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.orderItem.findMany({
        include: {
          product: true,
          order: true
        },
        where: {
          order_id: Number(id)
        }
      });
    }),

  createOrder: publicProcedure
    .input(z.object({
      email: z.string(),
      product_id: z.array(z.string()),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { email, product_id, description } = input;
      const order = await prisma.order.create({
        data: {
          user: { connect: { email } },
          description
        }
      })

      if (order) {
        product_id.map(async (product) => {
          await ctx.prisma.orderItem.createMany({
            data: [
              {
                order_id: order.id,
                product_id: product
              },
            ]
          })
        })
      }
      return order;
    }),
});


