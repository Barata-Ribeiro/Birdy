"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { PHOTO_UPLOAD } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function postPhoto(state: State, formData: FormData) {
    const URL = PHOTO_UPLOAD()

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            throw new Error("You must be logged in to edit your profile.")

        if (
            !formData.has("photoTitle") ||
            !formData.has("photoDescription") ||
            !formData.has("photoBirdSize") ||
            !formData.has("photoBirdHabitat") ||
            !formData.has("photoImage")
        )
            throw new Error(
                "All fields are required. Only the bird name is optional."
            )

        const image = formData.get("photoImage") as File
        if (image instanceof File && image.size === 0)
            throw new Error("The image file is empty.")

        const response = await fetch(URL, {
            method: "POST",
            headers: { Authorization: "Bearer " + access_token },
            body: formData
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )
        revalidateTag("photos")
        return {
            ok: true,
            client_error: null,
            response: null
        }
    } catch (error) {
        return ApiError(error)
    }
}
