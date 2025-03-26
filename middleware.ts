import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth"

// Add routes that require authentication
const protectedRoutes = ["/dashboard", "/marketplace/add", "/storage/add", "/transport/add"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtectedRoute) {
    // Get token from cookies
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      // Redirect to login if no token
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }

    // Verify token
    const payload = await verifyAuth(token)
    if (!payload) {
      // Redirect to login if token is invalid
      const url = new URL("/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/marketplace/add/:path*", "/storage/add/:path*", "/transport/add/:path*"],
}

