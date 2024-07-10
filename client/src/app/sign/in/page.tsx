import SignInForm from "@/components/forms/signin-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign In | Birdy",
    description: "Login to your Birdy account to start posting photos."
}

export default function SignInPage() {
    return (
        <>
            <h1 className="my-6 font-sans text-3xl font-semibold text-green-spring-50 lg:text-green-spring-950">
                Sign in to your account
            </h1>
            <SignInForm />
        </>
    )
}
