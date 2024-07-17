"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_UNFOLLOW } from "@/utils/api-urls"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export default async function userUnfollow(userId: string, followId: string) {
    const URL = USER_UNFOLLOW(userId)
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token
            },
            body: JSON.stringify({ followId })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        revalidateTag("public-profile")
        revalidateTag("profile")

        return {
            ok: true,
            client_error: null,
            response: { ...responseData }
        }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
