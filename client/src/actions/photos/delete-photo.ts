"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { PHOTO_DELETE_PHOTO } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function deletePhoto(photoId: string) {
    const URL = PHOTO_DELETE_PHOTO(photoId)

    const auth_token = cookies().get("auth_token")?.value
    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const response = await fetch(URL, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + auth_token },
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
