import logout from "@/actions/auth/logout"
import refreshToken from "@/actions/auth/refresh-token"
import verifyToken from "@/utils/verify-token"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const access_token = req.cookies.get("access_token")?.value
    const refresh_token = req.cookies.get("refresh_token")?.value
    const path = req.nextUrl.pathname
    let isAuthenticated = false

    if (access_token) {
        const isAccessTokenValid = await verifyToken(access_token)
        if (isAccessTokenValid) isAuthenticated = true
        else if (refresh_token) {
            const isRefreshTokenValid = await verifyToken(refresh_token)
            if (isRefreshTokenValid) {
                const state = await refreshToken(refresh_token)

                if (state.ok) isAuthenticated = true
                else {
                    console.error(
                        "Failed to refresh token:",
                        state.client_error
                    )

                    await logout()
                }
            }
        }
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
