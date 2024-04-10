"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_UPDATE_PRIVATE_PROFILE } from "@/utils/api-urls"
import inputValidation from "@/utils/input-validation"
import { cookies } from "next/headers"

export default async function putPrivateProfile(
    state: State,
    formData: FormData
) {
    const DEFAULT_MESSAGE = "Please enter a valid input."

    const username = formData.get("username") as string | null
    const display_name = formData.get("displayName") as string | null
    const avatar_url = formData.get("avatarUrl") as string | null
    const cover_image_url = formData.get("coverImageUrl") as string | null
    const bio = formData.get("bio") as string | null
    const password = formData.get("password") as string | null
    const confirm_password = formData.get("confirmPassword") as string | null
    const new_password = formData.get("newPassword") as string | null
    const userId = formData.get("userId") as string | null

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            throw new Error("You must be logged in to edit your profile.")

        if (!userId) throw new Error("User ID is required.")
        const URL = USER_UPDATE_PRIVATE_PROFILE(userId)

        if (!password || !confirm_password)
            throw new Error("Password is required to update your profile.")
        if (password !== confirm_password)
            throw new Error("Passwords do not match.")

        if (username) {
            const isUsernameValid = inputValidation(username, "username")
            if (!isUsernameValid.isValid)
                throw new Error(isUsernameValid.message ?? DEFAULT_MESSAGE)
        }

        if (new_password) {
            const isPasswordValid = inputValidation(new_password, "password")
            if (!isPasswordValid.isValid)
                throw new Error(isPasswordValid.message ?? DEFAULT_MESSAGE)

            if (new_password === password)
                throw new Error(
                    "New password must be different from the old password."
                )
        }

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token
            },
            body: JSON.stringify({
                username,
                display_name,
                avatar_url,
                cover_image_url,
                bio,
                password,
                new_password
            })
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
