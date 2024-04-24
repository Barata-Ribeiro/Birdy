"use server"

import { ApiResponse, State } from "@/interfaces/actions"
import ApiError from "@/utils/api-error"
import { USER_DELETE_PRIVATE_PROFILE } from "@/utils/api-urls"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export default async function deletePrivateProfile(
    state: State,
    formData: FormData
) {
    const userId = formData.get("userId") as string
    const username = formData.get("username") as string | null
    const password = formData.get("password") as string | null
    const confirm_password = formData.get("confirmPassword") as string | null

    try {
        const access_token = cookies().get("access_token")?.value
        if (!access_token)
            throw new Error("You must be logged in to view this page.")

        if (!userId) throw new Error("User ID is required.")
        const URL = USER_DELETE_PRIVATE_PROFILE(userId)

        if (!username)
            throw new Error("Username is required to delete your profile.")

        if (!password)
            throw new Error("Password is required to delete your profile.")

        if (confirm_password !== password)
            throw new Error("Passwords do not match.")

        const response = await fetch(URL, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + access_token }
        })

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

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
