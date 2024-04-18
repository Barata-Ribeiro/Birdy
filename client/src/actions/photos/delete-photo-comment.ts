"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { PHOTO_DELETE_COMMENT } from "@/utils/api-urls"

export default async function deleteComment(
    photoId: string,
    commentId: string
) {
    const URL = PHOTO_DELETE_COMMENT(photoId, commentId)

    try {
        const response = await fetch(URL, {
            method: "DELETE",
            next: { revalidate: 60, tags: ["comment"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        return {
            ok: true,
            client_error: null,
            response: responseData
        }
    } catch (error) {
        return ApiError(error)
    }
}
