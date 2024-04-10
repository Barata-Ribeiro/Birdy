"use server"

import { ApiResponse } from "@/interfaces/actions"
import { FeedRequestParams, FeedResponse } from "@/interfaces/api/photos"
import ApiError from "@/utils/api-error"
import { PHOTO_GET_FEED } from "@/utils/api-urls"

export default async function getPhotosFeed(
    { perPage = 6, page = 1, userId = null }: FeedRequestParams = {},
    optionsFetch?: RequestInit
) {
    const URL = PHOTO_GET_FEED({ perPage, page, userId })
    try {
        const options = optionsFetch || {
            next: { revalidate: 10, tags: ["photos"] }
        }

        const response = await fetch(URL, options)

        const responseData = (await response.json()) as ApiResponse

        if (!response.ok)
            throw new Error(
                responseData.message ?? "An unknown error occurred."
            )

        const data = responseData.data as FeedResponse[]

        return {
            ok: true,
            client_error: null,
            response: { ...responseData, data }
        }
    } catch (error) {
        return ApiError(error)
    }
}
