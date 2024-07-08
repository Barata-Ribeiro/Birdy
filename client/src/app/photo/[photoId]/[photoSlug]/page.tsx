import getPhoto from "@/actions/photos/get-photo"
import PhotoComments from "@/components/photo/photo-comments"
import DeleteButton from "@/components/utils/delete-button"
import LikeButton from "@/components/utils/like-button"
import { PhotoResponse } from "@/interfaces/api/photos"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaEye, FaRegComments } from "react-icons/fa"

interface PhotoPageProps {
    params: {
        photoId: string
        slug: string
    }
}

export async function generateMetadata({ params }: PhotoPageProps) {
    const state = await getPhoto(params.photoId)
    const photo = state.response?.data as PhotoResponse | null

    if (!photo) return { title: "Photo", description: "Photo Not Found..." }

    return {
        title: photo.title + " | Birdy",
        description: `photo${photo.title} taken by ${photo.author.display_name}.`
    }
}

export default async function PhotoPage({ params }: Readonly<PhotoPageProps>) {
    const state = await getPhoto(params.photoId)
    const photo = state.response?.data as PhotoResponse | null

    console.log(photo)

    if (!photo) return notFound()

    return (
        <section className="my-4">
            <div className="grid grid-cols-1 justify-center gap-4 max-md:items-center max-md:px-1 md:grid-cols-2 lg:justify-between">
                <Image
                    src={photo.image_url}
                    alt={`${photo.title}, by ${photo.author.display_name}`}
                    title={`${photo.title}, by ${photo.author.display_name}`}
                    className="object-cover italic md:rounded-xl"
                    width={1000}
                    height={1000}
                    sizes="100vw"
                    priority
                />

                <div className="flex flex-col gap-3 md:gap-5">
                    {/* Title */}
                    <div className="flex items-end justify-between">
                        <div className="mb-2 flex flex-col items-start justify-start gap-1 leading-none">
                            <h1 className="text-4xl font-semibold">{photo.title}</h1>
                            <Link
                                className="text-xs text-green-spring-400 dark:text-green-spring-300"
                                href={`/user/${photo.author.id}/${photo.author.username}`}
                                aria-label={`Profile Author: ${photo.author.username}`}
                            >
                                @{photo.author.username}
                            </Link>
                        </div>
                        <DeleteButton photo={photo} direction="right" />
                    </div>

                    {/* META NUMBERS */}
                    <div className="order-first flex justify-between md:order-none md:justify-start md:gap-4">
                        <span aria-label="Number of views" className="flex items-center gap-2">
                            <FaEye aria-hidden="true" />
                            {photo.meta.total_views}
                        </span>
                        <LikeButton photo={photo} />
                        <span aria-label="Number of comments" className="flex items-center gap-2">
                            <FaRegComments aria-hidden="true" />
                            {photo.meta.total_comments}
                        </span>
                    </div>

                    {/* META BIRD INFO */}
                    <div className="grid grid-flow-row gap-4 border-y-2 border-green-spring-100 py-3 dark:border-green-spring-500 md:py-5">
                        <p className="flex flex-col items-center gap-1 md:items-start">
                            <span className="font-semibold dark:text-green-spring-300">Bird Size</span>
                            <span className="font-normal">{photo.meta.bird_size} cm</span>
                        </p>
                        <p className="flex flex-col items-center gap-1 md:items-start">
                            <span className="font-semibold dark:text-green-spring-300">Habitat</span>
                            <span className="font-normal leading-relaxed">{photo.meta.bird_habitat}</span>
                        </p>
                    </div>

                    {/* COMMENTS */}
                    <PhotoComments photoId={params.photoId} comments={photo.comments} />
                </div>
            </div>
        </section>
    )
}
