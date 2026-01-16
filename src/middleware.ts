import { clerkMiddleware } from '@clerk/nextjs'
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next/static|favicon.ico|robots.txt|sitemap.xml|.well-known).*)'  ],
};
