"use server"

import { ApiResponse } from "@/interfaces/actions"
import { UserContextResponse } from "@/interfaces/api/users"
import ApiError from "@/utils/api-error"
import { USER_GET_CONTEXT } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function getUserContext() {
    const URL = USER_GET_CONTEXT()

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            return { ok: false, client_error: null, response: null }

        const response = await fetch(URL, {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
            next: { revalidate: 60 }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as UserContextResponse

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
