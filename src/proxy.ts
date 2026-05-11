import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/auth(.*)",
  "/api/auth(.*)",
]);

const isOrgSelectionRoute = createRouteMatcher(["/org-selection(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  // Public routes do not need authentication or organization selection.
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Clerk handles the redirect response for signed-out protected requests.
  if (!userId) {
    await auth.protect();
    return;
  }

  // Authenticated users can choose an organization without already having one selected.
  if (isOrgSelectionRoute(req)) {
    return NextResponse.next();
  }

  // For all protected routes, ensure an organization is selected.
  if (!orgId) {
    const orgSelectionUrl = new URL("/org-selection", req.url);
    return NextResponse.redirect(orgSelectionUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};