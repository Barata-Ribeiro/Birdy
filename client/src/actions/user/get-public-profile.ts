"use server"

import { ApiResponse } from "@/interfaces/actions"
import { PublicProfileResponse } from "@/interfaces/api/users"
import ApiError from "@/utils/api-error"
import { USER_GET_PROFILE } from "@/utils/api-urls"

export default async function getPublicProfile(username: string) {
    const URL = USER_GET_PROFILE(username)

    try {
        const response = await fetch(URL, {
            method: "GET",
            next: { revalidate: 60, tags: ["public-profile"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as PublicProfileResponse

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
