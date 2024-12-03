import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the route matchers for public and ignored routes
const publicRoutes = [
  '/',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success',
  '/sign-in',
  '/sign-up',
];

const ignoredRoutes = [
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
];

// Create route matchers
const isPublicRoute = createRouteMatcher(publicRoutes);
const isIgnoredRoute = createRouteMatcher(ignoredRoutes);

export default clerkMiddleware(async (auth, req) => {

  // // Allow ignored routes to bypass Clerk
  // if (isIgnoredRoute(req)) {
  //   return NextResponse.next();
  // }

  // // Allow public routes without authentication
  // if (isPublicRoute(req)) {
  //   return NextResponse.next();
  // }

  const userId = (await auth()).userId

  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from "next/server";


// const isPublicRoute = createRouteMatcher(['/sign-in(.)', '/sign-up(.)', '/',
//     '/api/clerk-webhook',
//     '/api/drive-activity/notification',
//     '/api/payment/success',])

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     const userId = (await auth()).userId
//     if (!userId) {
//       return NextResponse.redirect('/sign-in')
//     }

//     return NextResponse.next()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
