"use server"

import { State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { AUTH_REGISTER } from "@/utils/api-urls"
import inputValidation from "@/utils/input-validation"

export default async function register(
    state: State,
    formData: FormData
): Promise<State> {
    const URL = AUTH_REGISTER()
    const DEFAULT_MESSAGE = "Please enter a valid input."

    const username = formData.get("username") as string | null
    const display_name = formData.get("displayName") as string | null
    const password = formData.get("password") as string | null
    const confirm_password = formData.get("confirmPassword") as string | null
    const email = formData.get("email") as string | null

    try {
        if (!username || !display_name || !password || !email)
            throw new Error("All fields are required to register.")

        const isUsernameValid = inputValidation(username, "username")
        const isPasswordValid = inputValidation(password, "password")
        const isEmailValid = inputValidation(email, "email")

        if (!isUsernameValid.isValid)
            throw new Error(isUsernameValid.message ?? DEFAULT_MESSAGE)
        if (!isPasswordValid.isValid)
            throw new Error(isPasswordValid.message ?? DEFAULT_MESSAGE)
        if (password !== confirm_password)
            throw new Error("Passwords do not match.")
        if (!isEmailValid.isValid)
            throw new Error(isEmailValid.message ?? DEFAULT_MESSAGE)

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

        const responseData = await response.json()

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        return {
            ok: true,
            client_error: "",
            response: responseData
        }
    } catch (error) {
        return ApiError(error)
    }
}
