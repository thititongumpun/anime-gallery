import { createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "./routers/admin/category";
import { userRouter } from "./routers/admin/User";
import { productAdminRouter } from "./routers/admin/product";
import { productRouter } from "./routers/Product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  productAdmin: productAdminRouter,
  category: categoryRouter,
  user: userRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
