import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { articleRouter } from "./routers/article";
import { jieRouter } from "./routers/jie";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  article: articleRouter,
  jie: jieRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
