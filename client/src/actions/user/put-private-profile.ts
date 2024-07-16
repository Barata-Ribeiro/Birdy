"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_UPDATE_PRIVATE_PROFILE } from "@/utils/api-urls"
import inputValidation from "@/utils/input-validation"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function putPrivateProfile(state: State, formData: FormData) {
    const DEFAULT_MESSAGE = "Please enter a valid input."

    const userId = formData.get("userId") as string

    const auth_token = cookies().get("auth_token")?.value
    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const URL = USER_UPDATE_PRIVATE_PROFILE(userId)

        const username = formData.get("username") as string | null
        const display_name = formData.get("displayName") as string | null
        const avatar_url = formData.get("avatarUrl") as string | null
        const cover_image_url = formData.get("coverImageUrl") as string | null
        const bio = formData.get("bio") as string | null
        const password = formData.get("password") as string | null
        const confirm_password = formData.get("confirmPassword") as string | null
        const new_password = formData.get("newPassword") as string | null

        if (!password) return ApiError(new Error("Password is required to update your profile."))
        if (username) {
            const isUsernameValid = inputValidation(username, "username")
            if (!isUsernameValid.isValid) return ApiError(new Error(isUsernameValid.message ?? DEFAULT_MESSAGE))
        }

        if (new_password) {
            const isPasswordValid = inputValidation(new_password, "password")
            if (!isPasswordValid.isValid) return ApiError(new Error(isPasswordValid.message ?? DEFAULT_MESSAGE))

            if (!confirm_password) return ApiError(new Error("You must confirm your new password."))
            if (confirm_password !== new_password) return ApiError(new Error("Passwords do not match."))
            if (new_password === password)
                return ApiError(new Error("New password must be different from the old password."))
        }

        if (avatar_url && !avatar_url?.startsWith("https://")) return ApiError(new Error("Invalid URL."))

        if (cover_image_url && !cover_image_url?.startsWith("https://")) return ApiError(new Error("Invalid URL."))

        const response = await fetch(URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth_token
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

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

        revalidateTag("profile")
        revalidateTag("public-profile")

        return {
            ok: true,
            client_error: null,
            response: null
        }
    } catch (error) {
        return ApiError(error)
    }
}
