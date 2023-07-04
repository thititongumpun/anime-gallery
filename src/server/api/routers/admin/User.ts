// import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),

  getUserCount: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.count();
  }),
});
