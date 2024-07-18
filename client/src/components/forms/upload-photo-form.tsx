"use client"

import postPhoto from "@/actions/photos/post-photo"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import Image from "next/image"
import { type ChangeEvent, type DragEvent, useEffect, useState } from "react"
import { FaCloudArrowUp } from "react-icons/fa6"
import { useForm } from "@/hooks/use-form"
import ErrorElement from "@/components/utils/error-element"
import { PhotoResponse } from "@/interfaces/api/photos"

export default function UploadPhotoForm({
    userId,
    username
}: Readonly<{
    userId: string
    username: string
}>) {
    const { isPending, formState, formAction, onSubmit } = useForm(postPhoto, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (formState.ok) {
            const data = formState.response?.data as PhotoResponse
            window.location.href = "/photo/" + data.id + "/" + data.slug
        }
    }, [formState, userId, username])

    const [img, setImg] = useState<{
        preview: string | undefined
        raw: File | undefined
    }>({
        preview: undefined,
        raw: undefined
    })

    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        if (target.files?.[0]) {
            setImg({
                preview: URL.createObjectURL(target.files[0]),
                raw: target.files[0]
            })
        }
    }

    const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.dataTransfer.files?.[0]) {
            setImg({
                preview: URL.createObjectURL(event.dataTransfer.files[0]),
                raw: event.dataTransfer.files[0]
            })

            const fileInput = document.getElementById("photoImage") as HTMLInputElement
            fileInput.files = event.dataTransfer.files
        }
    }

    const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    return (
        <div className="mx-auto grid grid-cols-1 items-center gap-4 pt-4 lg:grid-cols-2">
            <form action={formAction} onSubmit={onSubmit} className="flex w-full flex-col gap-4">
                <div className="pb-2 pt-4">
                    <Input
                        label="Photo Title"
                        name="title"
                        className="block w-full rounded-lg bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <label className="sr-only capitalize" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="peer block w-full resize-none rounded-lg border-green-spring-50 bg-mantis-200 p-4 text-lg text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 dark:bg-mantis-800 dark:text-mantis-50 dark:placeholder:text-green-spring-300"
                        name="description"
                        id="description"
                        placeholder="Photo Description"
                        cols={30}
                        rows={4}
                    ></textarea>
                </div>
                <div className="pb-2 pt-4">
                    <Input
                        type="number"
                        label="Bird Size (in cm)"
                        name="bird_size"
                        className="block w-full rounded-lg bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        step="1"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <label className="sr-only capitalize" htmlFor="bird_habitat">
                        Bird Habitat
                    </label>
                    <textarea
                        className="peer block w-full resize-none rounded-lg border-green-spring-50 bg-mantis-200 p-4 text-lg text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 dark:bg-mantis-800 dark:text-mantis-50 dark:placeholder:text-green-spring-300"
                        name="bird_habitat"
                        id="bird_habitat"
                        placeholder="Bird Habitat"
                        cols={30}
                        rows={4}
                    ></textarea>
                </div>
                <button
                    type="button"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="flex cursor-pointer rounded-md border-2 border-dashed border-green-spring-300"
                    tabIndex={0}
                >
                    <input
                        onChange={handleImgChange}
                        type="file"
                        name="photoImage"
                        id="photoImage"
                        className="sr-only"
                        required
                        aria-required
                    />
                    <label
                        htmlFor="photoImage"
                        className="w-full cursor-pointer rounded-lg py-4 text-center text-green-spring-500 hover:bg-green-spring-100"
                    >
                        {img?.raw ? (
                            <p className="space-x-2 divide-x-2 divide-green-spring-300">
                                <span className="text-green-spring-600">
                                    <strong>File:</strong> {img.raw.name}
                                </span>
                                <span className="pl-2 text-green-spring-600">
                                    <strong>Size:</strong> {(img.raw.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            </p>
                        ) : (
                            <p className="mx-auto flex h-full w-full flex-col gap-1">
                                <FaCloudArrowUp size={20} className="mx-auto" />
                                Drag and drop your image here, or click to select.
                            </p>
                        )}
                    </label>
                </button>
                <ErrorElement error={formState.client_error} />
                <div className="px-4 pb-2 pt-4">
                    <FormButton
                        type="submit"
                        className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                        aria-label="Post Photo"
                        disabled={isPending}
                        aria-disabled={isPending}
                    >
                        {isPending ? "Uploading..." : "Post Photo"}
                    </FormButton>
                </div>
            </form>
            {img?.raw && (
                <Image
                    src={img.preview ?? ""}
                    alt="Preview of the uploaded image"
                    title="Preview of the uploaded image"
                    className="aspect-square h-auto max-w-xl justify-self-center rounded-lg object-cover object-center align-middle italic"
                    width={550}
                    height={550}
                    quality={75}
                    priority
                />
            )}
        </div>
    )
}
