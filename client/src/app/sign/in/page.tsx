import SignInForm from "@/components/forms/signin-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign In | Birdy",
    description: "Login to your Birdy account to start posting photos."
}

export default function SignInPage() {
    return (
        <>
            <h1 className="my-6 text-2xl">Birdy</h1>
            <SignInForm />
        </>
    )
}
