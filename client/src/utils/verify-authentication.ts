import { cookies } from "next/headers"
import logout from "@/actions/auth/logout"
import verifyToken from "@/utils/verify-token"
import refreshToken from "@/actions/auth/refresh-token"

export default async function verifyAuthentication() {
    const access_token = cookies().get("access_token")?.value
    if (!access_token) {
        await logout()
        throw new Error("You must be logged in to view this page.")
    }
    
    if (!await verifyToken(access_token)) {
        const refresh_token = cookies().get("refresh_token")?.value
        if (!refresh_token) {
            await logout()
            throw new Error("You must be logged in to view this page.")
        }
        
        const verifyRefreshToken = await verifyToken(refresh_token)
        if (!verifyRefreshToken) {
            await logout()
            throw new Error("You must be logged in to view this page.")
        }
        
        await refreshToken(refresh_token)

        return cookies().get("access_token")?.value
    }
    
    return access_token
}