"use client"

import getPhotosFeed from "@/actions/photos/get-photos-feed"
import FeedPhotos from "@/components/feed/photos-feed"
import Loading from "@/components/utils/loading"
import { FeedResponse } from "@/interfaces/api/photos"
import { useEffect, useRef, useState } from "react"

export interface FeedProps {
    photos: FeedResponse[]
    userId?: string | null
}

export default function Feed({ photos, userId }: Readonly<FeedProps>) {
    const [photosFeed, setPhotosFeed] = useState<FeedResponse[]>(photos)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [infinite, setInfinite] = useState(photos.length >= 6)

    const fetching = useRef(false)

    function infiniteScroll() {
        if (fetching.current) return

        fetching.current = true

        setLoading(true)

        setTimeout(() => {
            setPage((currentPage) => currentPage + 1)
            fetching.current = false
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        if (page === 1) return
        async function fetchFeedPhotos(page: number) {
            const state = await getPhotosFeed(
                { perPage: 6, page, userId },
                { cache: "no-store" }
            )
            const data = state.response?.data as FeedResponse[] | null

            if (state && data) {
                setPhotosFeed((prevPhotos) => [...prevPhotos, ...data])
                if (data.length < 6) setInfinite(false)
            }
        }

        fetchFeedPhotos(page)
    }, [page])

    useEffect(() => {
        if (infinite) {
            window.addEventListener("scroll", infiniteScroll)
            window.addEventListener("wheel", infiniteScroll)
        } else {
            window.removeEventListener("scroll", infiniteScroll)
            window.removeEventListener("wheel", infiniteScroll)
        }
        return () => {
            window.removeEventListener("scroll", infiniteScroll)
            window.removeEventListener("wheel", infiniteScroll)
        }
    }, [infinite])

    return (
        <>
            <FeedPhotos photos={photosFeed} />
            <div className="mx-auto my-1 flex h-24">
                {infinite ? (
                    loading && <Loading />
                ) : (
                    <p className="pb-0 pl-8 pr-16 pt-4 text-center font-semibold text-green-spring-300">
                        You have reached the end of the feed.
                    </p>
                )}
            </div>
        </>
    )
}
