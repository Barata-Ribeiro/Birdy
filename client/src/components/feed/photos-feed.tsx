import { FeedResponse } from "@/interfaces/api/photos"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaEye, FaHeart, FaRegComments } from "react-icons/fa"

export default function FeedPhotos({
    photos
}: Readonly<{ photos: FeedResponse[] }>) {
    const [hoveredImageId, setHoveredImageId] = useState<string | null>(null)

    return (
        <ul className="masonry sm:masonry-sm md:masonry-md px-4 sm:px-0 [&>li:not(:first-child)]:mt-4">
            {photos.map((photo, i) => (
                <li
                    key={photo.id + "_" + i}
                    id={photo.id + "_" + i}
                    className="break-inside"
                >
                    <Link
                        href={`/photo/${photo.id}/${photo.slug}`}
                        className="relative"
                        onPointerEnter={() => setHoveredImageId(photo.id)}
                        onPointerLeave={() => setHoveredImageId(null)}
                    >
                        <div
                            className={`absolute inset-0 ${hoveredImageId === photo.id ? "flex" : "hidden"} h-full w-full items-end justify-around gap-4 rounded-md bg-black/60 pb-4 text-mantis-50`}
                        >
                            <span className="flex items-center gap-2">
                                <FaEye />
                                {photo.meta.total_views}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaHeart />
                                {photo.meta.total_likes}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaRegComments />
                                {photo.meta.total_comments}
                            </span>
                        </div>
                        <Image
                            src={photo.image_url}
                            alt={`Photo: ${photo.title}, by @${photo.author.username}`}
                            title={`Photo: ${photo.title}, by @${photo.author.username}`}
                            className="rounded-md object-cover"
                            width={1500}
                            height={1500}
                            sizes="100vw"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    )
}
