import { cookies } from "next/headers"

export default async function verifyAuthentication() {
    const auth_token = cookies().get("auth_token")?.value
    if (!auth_token) throw new Error("You must be logged in to view this page.")
    return auth_token
}
