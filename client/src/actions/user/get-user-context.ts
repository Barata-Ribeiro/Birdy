"use server"

import { ApiResponse } from "@/interfaces/actions"
import { UserContextResponse } from "@/interfaces/api/users"
import ApiError from "@/utils/api-error"
import { USER_GET_CONTEXT } from "@/utils/api-urls"
import { cookies } from "next/headers"

export default async function getUserContext() {
    const URL = USER_GET_CONTEXT()
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const response = await fetch(URL, {
            method: "GET",
            headers: { Authorization: "Bearer " + auth_token },
            next: { revalidate: 60, tags: ["profile"] }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

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
