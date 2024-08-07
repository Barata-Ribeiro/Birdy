"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { ADMIN_DELETE_PHOTO } from "@/utils/api-urls"

export default async function adminDeletePhoto(photoId: string) {
    const URL = ADMIN_DELETE_PHOTO(photoId)

    try {
        const response = await fetch(URL, {
            method: "DELETE",
            next: { revalidate: 60, tags: ["photos"] }
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
