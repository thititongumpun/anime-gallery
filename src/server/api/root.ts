import { createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "./routers/admin/product";
import { categoryRouter } from "./routers/admin/category";
import { userRouter } from "./routers/admin/User";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  category: categoryRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
