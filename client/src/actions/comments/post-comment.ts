"use server"
import { ApiResponse, State } from "@/interfaces/actions"
import { PhotoComment } from "@/interfaces/api/photos"
import ApiError from "@/utils/api-error"
import { PHOTO_ADD_COMMENT } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function postComment(state: State, formData: FormData) {
    const comment = formData.get("comment") as string | null
    const photoId = formData.get("photoId") as string

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            throw new Error("You must be logged in to edit your profile.")

        if (!comment || comment.trim() === "")
            throw new Error("You cannot add an empty comment.")

        const URL = PHOTO_ADD_COMMENT(photoId)

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token
            },
            body: JSON.stringify({ comment })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

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
