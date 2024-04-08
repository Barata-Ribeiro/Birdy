"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import { AuthLoginResponse } from "@/interfaces/api/auth"
import ApiError from "@/utils/api-error"
import { AUTH_LOGIN } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function login(state: State, formData: FormData) {
    const URL = AUTH_LOGIN()
    const FIFTEEN_MINUTES = 15 * 60 * 1000
    const ONE_DAY = 24 * 60 * 60 * 1000
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

    const username = formData.get("username") as string | null
    const password = formData.get("password") as string | null
    const remember_me = formData.get("rememberMe") === "on"

    try {
        if (!username || !password)
            throw new Error("All fields are required to login.")

        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                remember_me
            })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as AuthLoginResponse

        cookies().set("access_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: Date.now() - FIFTEEN_MINUTES
        })
        cookies().set("refresh_token", data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: Date.now() - (remember_me ? THIRTY_DAYS : ONE_DAY)
        })

        return {
            ok: true,
            client_error: null,
            response: null
        }
    } catch (error) {
        return ApiError(error)
    }
}
