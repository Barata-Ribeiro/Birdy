"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_FOLLOW } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function userFollow(userId: string, followId: string) {
    const URL = USER_FOLLOW(userId)

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            throw new Error("You must be logged in to edit your profile.")

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token
            },
            body: JSON.stringify({ followId })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        return {
            ok: true,
            client_error: null,
            response: { ...responseData }
        }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
