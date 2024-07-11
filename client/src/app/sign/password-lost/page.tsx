import PasswordLostForm from "@/components/forms/password-lost-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Password Lost",
    description: "Forgot your password? Type your email address and we will send you a link to reset your password."
}

export default async function PasswordLostPage() {
    return (
        <>
            <div className="my-6 flex flex-col gap-2">
                <h1 className="font-sans text-3xl font-semibold leading-normal text-green-spring-50 lg:text-green-spring-950">
                    Forgot your password?
                </h1>
                <h2 className="font-serif text-lg leading-normal text-green-spring-50 lg:text-green-spring-950">
                    Type your email address and we will send you a link to reset your password.
                </h2>
            </div>

            <PasswordLostForm />
        </>
    )
}
