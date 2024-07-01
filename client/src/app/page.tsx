import getPhotosFeed from "@/actions/photos/get-photos-feed"
import Feed from "@/components/feed/feed"
import { FeedResponse } from "@/interfaces/api/photos"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Feed | Birdy",
    description:
        "Welcome to the Birdy social network! This is the feed with all the photos from our users."
}

export default async function Home() {
    const state = await getPhotosFeed()
    const photos = (state.response?.data as FeedResponse[]) ?? []

    return (
        <section className="my-4">
            {photos.length > 0 ? (
                <Feed photos={photos} />
            ) : (
                <p className="my-60 text-center text-green-spring-500">
                    No photos to show.
                    <br />
                    Create an account and start sharing your photos!
                </p>
            )}
        </section>
    )
}
