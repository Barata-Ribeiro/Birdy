"use server"

import { ApiResponse } from "@/interfaces/actions"
import { ToggleLikeResponse } from "@/interfaces/api/photos"
import ApiError from "@/utils/api-error"
import { PHOTO_TOGGLE_LIKE } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function postToggleLike(photoId: string) {
    const URL = PHOTO_TOGGLE_LIKE(photoId)
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token
            },
            body: JSON.stringify({})
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        const data = responseData.data as ToggleLikeResponse

        revalidateTag("photos")

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
