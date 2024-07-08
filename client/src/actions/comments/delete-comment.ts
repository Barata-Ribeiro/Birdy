"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { PHOTO_DELETE_COMMENT } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import verifyAuthenticationAndReturnToken from "@/utils/verify-authentication"

export default async function deleteComment(photoId: string, commentId: string) {
    const URL = PHOTO_DELETE_COMMENT(photoId, commentId)

    try {
        const auth_token = await verifyAuthenticationAndReturnToken()

        const response = await fetch(URL, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + auth_token },
            next: { revalidate: 60, tags: ["comment"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) throw new Error(responseData.message ?? "An unknown error occurred.")

        revalidateTag("comment")
        return {
            ok: true,
            client_error: null,
            response: responseData
        }
    } catch (error) {
        return ApiError(error)
    }
}
