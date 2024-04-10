"use server"
import { ApiResponse } from "@/interfaces/actions"
import { PhotoResponse } from "@/interfaces/api/photos"
import ApiError from "@/utils/api-error"
import { PHOTO_GET_PHOTO } from "@/utils/api-urls"

export default async function getPhoto(photoId: string) {
    const URL = PHOTO_GET_PHOTO(photoId)

    try {
        const response = await fetch(URL, {
            next: { revalidate: 60, tags: ["photos", "comment"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as PhotoResponse

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
