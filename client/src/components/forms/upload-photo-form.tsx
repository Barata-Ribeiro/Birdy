"use client"

import postPhoto from "@/actions/photos/post-photo"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import Image from "next/image"
import { type ChangeEvent, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function UploadPhotoForm({
    userId,
    username
}: {
    userId: string
    username: string
}) {
    const { pending } = useFormStatus()
    const [state, action] = useFormState(postPhoto, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (state.ok) window.location.href = `/dashboard/${userId}/${username}`
    }, [state.ok])

    const [img, setImg] = useState<{
        preview: string | undefined
        raw: File | undefined
    }>({
        preview: undefined,
        raw: undefined
    })

    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files[0]) {
            setImg({
                preview: URL.createObjectURL(target.files[0]),
                raw: target.files[0]
            })
        }
    }

    return (
        <div className="mx-0 grid grid-cols-1 items-center gap-4 pt-4 lg:grid-cols-2">
            <form action={action} className="flex w-full flex-col gap-4">
                <div className="pb-2 pt-4">
                    <Input
                        label="Photo Title"
                        name="photoTitle"
                        className="block w-full rounded-lg bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <Input
                        label="Photo Description"
                        name="photoDescription"
                        className="block w-full rounded-lg bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <Input
                        label="Bird Size"
                        name="photoBirdSize"
                        className="block w-full rounded-lg bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <Input
                        label="Bird Habitat"
                        name="photoBirdHabitat"
                        className="block w-full rounded-lg bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <input
                        onChange={handleImgChange}
                        type="file"
                        name="photoImage"
                        id="photoImage"
                        className="block w-full text-lg"
                        required
                        aria-required
                    />
                </div>
                <div className="px-4 pb-2 pt-4">
                    <FormButton
                        type="submit"
                        className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                        aria-label="Post Photo"
                        disabled={pending}
                        aria-disabled={pending}
                    >
                        {pending ? "Uploading..." : "Post Photo"}
                    </FormButton>
                </div>
            </form>
            {img && (
                <Image
                    src={img.preview ?? ""}
                    alt="Preview of the uploaded image"
                    title="Preview of the uploaded image"
                    className="aspect-square h-auto max-w-md justify-self-center rounded-lg object-cover object-center align-middle italic"
                    width={500}
                    height={500}
                    sizes="100vw"
                />
            )}
        </div>
    )
}
