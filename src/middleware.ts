import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("user_token")?.value;

    // console.log({ token });


    const { pathname } = req.nextUrl;

    // Define pages accessible only when NOT logged in
    const authPages = ["/signin", "/signup"];

    if (!token && !authPages.includes(pathname)) {
        // Redirect unauthenticated users to Sign In
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token && authPages.includes(pathname)) {
        // Redirect authenticated users away from auth pages
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to ALL routes
export const config = {
    matcher: "/:path*", // Apply middleware globally
};
