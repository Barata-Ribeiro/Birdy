"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_DELETE_PRIVATE_PROFILE } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function deletePrivateProfile(state: State, formData: FormData) {
    const userId = formData.get("userId") as string
    const auth_token = cookies().get("auth_token")?.value

    try {
        if (!auth_token) return ApiError(new Error("You are not authenticated."))

        const URL = USER_DELETE_PRIVATE_PROFILE(userId)

        const username = formData.get("username") as string | null
        const password = formData.get("password") as string | null
        const confirm_password = formData.get("confirmPassword") as string | null

        if (!username) return ApiError(new Error("Username is required to delete your profile."))
        if (!password) return ApiError(new Error("Password is required to delete your profile."))
        if (confirm_password !== password) return ApiError(new Error("Passwords do not match."))

        const response = await fetch(URL, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + auth_token }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok) return ApiError(new Error(responseData.message ?? "An unknown error occurred."))

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
