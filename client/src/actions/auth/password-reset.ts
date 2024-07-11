"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { AUTH_RESETPASSWORD } from "@/utils/api-urls"

export default async function passwordReset(state: State, formData: FormData) {
    try {
        const userId = formData.get("userId") as string
        const token = formData.get("token") as string
        const password = formData.get("password") as string | null
        const confirmPassword = formData.get("confirmPassword") as string | null

        const URL = AUTH_RESETPASSWORD(userId, token)

        if (!password || !confirmPassword) throw new Error("Your new password and confirmation password are required.")
        if (password !== confirmPassword) throw new Error("Your new password and confirmation password do not match.")

        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) throw new Error(responseData.message ?? "An unknown error occurred.")

        return { ok: true, client_error: null, response: responseData }
    } catch (error: unknown) {
        return ApiError(error)
    }
}
