"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_CHECK_FOLLOW } from "@/utils/api-urls"

export default async function isUserFollowing(username: string, userId: string) {
    const URL = USER_CHECK_FOLLOW(username, userId)
    try {
        const response = await fetch(URL, {
            method: "GET",
            next: { revalidate: 60 }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        const data = responseData.data as { followed_by_loggedIn_user: boolean }

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
