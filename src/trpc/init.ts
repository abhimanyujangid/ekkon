import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import * as Sentry from "@sentry/node";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */

  return {};
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

const sentryMiddleware = t.middleware(
  Sentry.trpcMiddleware({
    attachRpcInput: true,
  }),
);

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(sentryMiddleware);

// Authenticated procedure - call only if the user is logged in
export const authProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      userId,
    },
  });
});

// Organization procedure - call only if the user is logged in and belongs to an organization
export const orgProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const { orgId, userId } = await auth();

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // If the user does not belong to an organization, throw an error
  if (!orgId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "User does not belong to an organization" });
  }

  return next({
    ctx: {
      userId,
      orgId,
    },
  });
});
