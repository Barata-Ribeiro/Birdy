"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { ADMIN_DELETE_COMMENT } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function adminDeleteComment(photoId: string, commentId: string) {
    const URL = ADMIN_DELETE_COMMENT(photoId, commentId)
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token
            },
            next: { revalidate: 60, tags: ["comment"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        return {
            ok: true,
            client_error: null,
            response: responseData
        }
    } catch (error) {
        return ApiError(error)
    }
}
