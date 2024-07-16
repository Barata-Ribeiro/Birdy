"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { AUTH_FORGOTPASSWORD } from "@/utils/api-urls"

export default async function passwordLost(state: State, formData: FormData): Promise<State> {
    try {
        const URL = AUTH_FORGOTPASSWORD()
        const email = formData.get("email") as string | null

        if (!email) return ApiError(new Error("Email is required to send a password reset link."))

        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        return { ok: true, client_error: null, response: responseData }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
