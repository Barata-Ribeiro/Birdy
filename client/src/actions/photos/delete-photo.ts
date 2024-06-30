"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { PHOTO_DELETE_PHOTO } from "@/utils/api-urls"
import verifyAuthenticationAndReturnToken from "@/utils/verify-authentication"

export default async function deletePhoto(photoId: string) {
    const URL = PHOTO_DELETE_PHOTO(photoId)

    try {
        const access_token = await verifyAuthenticationAndReturnToken()

        const response = await fetch(URL, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + access_token },
            next: { revalidate: 60, tags: ["photos"] }
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
