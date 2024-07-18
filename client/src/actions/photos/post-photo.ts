"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { PHOTO_UPLOAD } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { PhotoResponse } from "@/interfaces/api/photos"

export default async function postPhoto(state: State, formData: FormData) {
    const URL = PHOTO_UPLOAD()
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        if (
            !formData.has("title") ||
            !formData.has("description") ||
            !formData.has("bird_size") ||
            !formData.has("bird_habitat") ||
            !formData.has("photoImage")
        )
            return ApiError(new Error("All fields are required. Only the bird name is optional."))

        const image = formData.get("photoImage") as File
        if (image instanceof File && image.size === 0) return ApiError(new Error("The image is required."))

        const response = await fetch(URL, {
            method: "POST",
            headers: { Authorization: "Bearer " + auth_token },
            body: formData
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        const data = responseData.data as PhotoResponse

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
