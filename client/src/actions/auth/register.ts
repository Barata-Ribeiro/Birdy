"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import { AuthRegisterResponse } from "@/interfaces/api/auth"
import ApiError from "@/utils/api-error"
import { AUTH_REGISTER } from "@/utils/api-urls"
import inputValidation from "@/utils/input-validation"

export default async function register(state: State, formData: FormData): Promise<State> {
    const URL = AUTH_REGISTER()
    const DEFAULT_MESSAGE = "Please enter a valid input."

    try {
        const username = formData.get("username") as string | null
        const display_name = formData.get("displayName") as string | null
        const password = formData.get("password") as string | null
        const confirm_password = formData.get("confirmPassword") as string | null
        const email = formData.get("email") as string | null

        if (!username || !display_name || !password || !email) {
            return ApiError(new Error("All fields are required to register."))
        }

        const isUsernameValid = inputValidation(username, "username")
        const isPasswordValid = inputValidation(password, "password")
        const isEmailValid = inputValidation(email, "email")

        if (!isUsernameValid.isValid) return ApiError(new Error(isUsernameValid.message ?? DEFAULT_MESSAGE))
        if (!isPasswordValid.isValid) return ApiError(new Error(isPasswordValid.message ?? DEFAULT_MESSAGE))
        if (password !== confirm_password) return ApiError(new Error("Passwords do not match."))
        if (!isEmailValid.isValid) return ApiError(new Error(isEmailValid.message ?? DEFAULT_MESSAGE))

        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                display_name,
                password,
                email
            })
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        const data = responseData.data as AuthRegisterResponse

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
