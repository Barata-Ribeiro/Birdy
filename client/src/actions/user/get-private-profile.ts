"use server"

import { ApiResponse } from "@/interfaces/actions"
import { PrivateProfileResponse } from "@/interfaces/api/users"
import ApiError from "@/utils/api-error"
import { USER_GET_PRIVATE_PROFILE } from "@/utils/api-urls"
import verifyAuthenticationAndReturnToken from "@/utils/verify-authentication"

export default async function getPrivateProfile(userId: string) {
    const URL = USER_GET_PRIVATE_PROFILE(userId)

    try {
        const access_token = await verifyAuthenticationAndReturnToken()

        const response = await fetch(URL, {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
            next: { revalidate: 60, tags: ["profile"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as PrivateProfileResponse

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
