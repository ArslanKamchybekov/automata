import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// publicRoutes: [
//     '/',
//     '/api/clerk-webhook',
//     '/api/drive-activity/notification',
//     '/api/payment/success',
//   ],
//   ignoredRoutes: [
//     '/api/auth/callback/discord',
//     '/api/auth/callback/notion',
//     '/api/auth/callback/slack',
//     '/api/flow',
//     '/api/cron/wait',
//   ],

const isProtectedRoute = (req: any) => {
    const protectedRoutes = [
        '/api/auth/callback/discord',
        '/api/auth/callback/notion',
        '/api/auth/callback/slack',
        '/api/flow',
        '/api/cron/wait',
    ]

    return protectedRoutes.some((route) => createRouteMatcher(route))
}

export default clerkMiddleware(async (auth, req) => {
    const baseHost = ["localhost:3000", process.env.NEXT_PUBLIC_URL]
    const host = req.headers.get("host")
    const reqPath = req.nextUrl.pathname
    const origin = req.nextUrl.origin

    // Protect routes if required
    // if (isProtectedRoute(req)) {
    //     if (!(await auth()).userId) {
    //         return NextResponse.redirect("/")
    //     }
    // }

    // if (!baseHost.includes(host as string) && reqPath.includes("/group")) {
    //     const response = await fetch(`${origin}/api/domain?host=${host}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": origin, // Allow the origin
    //             "Access-Control-Allow-Credentials": "true", // Allow cookies or auth headers
    //         },
    //         credentials: "include", // Ensure credentials are passed if needed
    //     })

    //     if (response.ok) {
    //         const data = await response.json()

    //         // Redirect if a domain rewrite is needed
    //         if (data.status === 200 && data.domain) {
    //             return NextResponse.rewrite(
    //                 new URL(reqPath, `https://${data.domain}/${reqPath}`),
    //             )
    //         }
    //     } else {
    //         console.error("Failed to fetch domain data:", await response.text())
    //     }
    // }

    return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
