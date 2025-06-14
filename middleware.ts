import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoutr = createRouteMatcher(["/", "/sign-in(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const { pathname } = request.nextUrl;

  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/launch", request.url));
  }

  if (userId && pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/launch", request.url));
  }

  if (!userId && !isPublicRoutr(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|webm)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
