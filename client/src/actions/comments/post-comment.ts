"use server"
import { ApiResponse, State } from "@/interfaces/actions"
import { PhotoComment } from "@/interfaces/api/photos"
import ApiError from "@/utils/api-error"
import { PHOTO_ADD_COMMENT } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function postComment(state: State, formData: FormData) {
    const photoId = formData.get("photoId") as string
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const content = formData.get("comment") as string | null
        if (!content || content.trim() === "") return ApiError(new Error("You cannot add an empty content."))

        const URL = PHOTO_ADD_COMMENT(photoId)

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token
            },
            body: JSON.stringify({ content })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        const data = responseData.data as PhotoComment

        revalidateTag("comment")

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
