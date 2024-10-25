// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const isAuthenticated = !!req.nextauth.token;

    // Always allow access to the home page and login page
    if (pathname === "/" || pathname === "/api/auth/signin") {
      return NextResponse.next();
    }

    // For all other routes, require authentication
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to the home page and api/auth/signin page for everyone
        if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/api/auth/signin") {
          return true;
        }
        // Require authentication for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/api/auth/signin',
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
