import { cookies } from "next/headers"
import logout from "@/actions/auth/logout"

export default async function verifyAuthentication() {
    const access_token = cookies().get("access_token")?.value
    if (!access_token) {
        await logout()
        throw new Error("You must be logged in to view this page.")
    }
    
    return access_token.toString()
}