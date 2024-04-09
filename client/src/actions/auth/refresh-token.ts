"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import { AuthRefresTokenhResponse } from "@/interfaces/api/auth"
import ApiError from "@/utils/api-error"
import { AUTH_REFRESHTOKEN } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function refreshToken(state: State) {
    const URL = AUTH_REFRESHTOKEN()
    const FIFTEEN_MINUTES = 15 * 60 * 1000

    try {
        const refresh_token = cookies().get("refresh_token")?.value
        if (!refresh_token) throw new Error("No refresh token found.")

        const response = await fetch(URL, {
            method: "GET",
            headers: { "x-refresh-token": refresh_token }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as AuthRefresTokenhResponse

        cookies().set("access_token", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            expires: Date.now() + FIFTEEN_MINUTES
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
