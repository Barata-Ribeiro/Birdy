import verifyToken from "@/utils/verify-token"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
    const authToken = req.cookies.get("auth_token")?.value
    const path = req.nextUrl.pathname
    let isAuthenticated = false

    if (authToken) {
        const isAuthTokenValid = await verifyToken(authToken)
        if (isAuthTokenValid) isAuthenticated = true
        else req.cookies.delete("auth_token")
    }

    if (!isAuthenticated && path.startsWith("/dashboard"))
        return NextResponse.redirect(new URL("/sign/in", req.url))

    if (isAuthenticated && path.startsWith("/sign"))
        return NextResponse.redirect(new URL("/", req.url))

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign/:path*"]
}
