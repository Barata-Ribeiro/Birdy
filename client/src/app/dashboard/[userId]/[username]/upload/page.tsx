import UploadPhotoForm from "@/components/forms/upload-photo-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Upload",
    description: "In this page you can upload new bird photographs to share with the world."
}

export default async function UploadPage({
    params
}: Readonly<{
    params: { userId: string; username: string }
}>) {
    return (
        <section className="p-4 sm:px-0">
            <h1 className="text-center text-2xl">Post Your Picture!</h1>
            <UploadPhotoForm userId={params.userId} username={params.username} />
        </section>
    )
}
