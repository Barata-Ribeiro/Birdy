"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_UNFOLLOW } from "@/utils/api-urls"
import verifyAuthenticationAndReturnToken from "@/utils/verify-authentication"

export default async function userUnfollow(userId: string, followId: string) {
    const URL = USER_UNFOLLOW(userId)

    try {
        const auth_token = await verifyAuthenticationAndReturnToken()

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token
            },
            body: JSON.stringify({ followId })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) throw new Error(responseData.message ?? "An unknown error occurred.")

        return {
            ok: true,
            client_error: null,
            response: { ...responseData }
        }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
