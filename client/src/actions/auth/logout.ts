"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function logout() {
    cookies().delete("access_token")
    cookies().delete("refresh_token")

    redirect("/sign/in")
}
