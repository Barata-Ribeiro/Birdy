import SignUpForm from "@/components/forms/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sign Up | Birdy",
    description: "Create an account to start posting photos and interacting within Birdy."
}

export default async function SignUpPage() {
    return (
        <>
            <h1 className="my-6 font-sans text-3xl font-semibold text-green-spring-50 lg:text-green-spring-950">
                Create your free account
            </h1>
            <SignUpForm />
        </>
    )
}
