import { notFound } from "next/navigation"
import PasswordResetForm from "@/components/forms/password-reset-form"
import { Metadata } from "next"

interface PasswordResetPageProps {
    params: {
        userId: string
        token: string
    }
}

export const metadata: Metadata = {
    title: "Password Reset",
    description: "Reset your password to regain access to your Birdy account."
}

export default async function PasswordResetPage({ params }: Readonly<PasswordResetPageProps>) {
    if (!params.userId || !params.token) return notFound()

    return (
        <>
            <div className="my-6 flex flex-col gap-2">
                <h1 className="font-sans text-3xl font-semibold leading-normal text-green-spring-50 lg:text-green-spring-950">
                    Reset your password
                </h1>
                <h2 className="font-serif text-lg leading-normal text-green-spring-50 lg:text-green-spring-950">
                    Enter your new password below
                </h2>
            </div>

            <PasswordResetForm userId={params.userId} token={params.token} />
        </>
    )
}
