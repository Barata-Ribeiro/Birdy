"use server"

import { ApiResponse } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_DELETE_PRIVATE_PROFILE } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function deletePrivateProfile(userId: string) {
    const URL = USER_DELETE_PRIVATE_PROFILE(userId)

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            throw new Error("You must be logged in to view this page.")

        const response = await fetch(URL, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + access_token }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        return {
            ok: true,
            client_error: null,
            response: null
        }
    } catch (error) {
        return ApiError(error)
    }
}
