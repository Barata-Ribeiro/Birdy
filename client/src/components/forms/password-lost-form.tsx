"use client"

import { useFormState, useFormStatus } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Input from "@/components/utils/input"
import FormButton from "@/components/utils/form-button"
import passwordLost from "@/actions/auth/password-lost"

export default function PasswordLostForm() {
    const router = useRouter()
    const { pending } = useFormStatus()
    const [state, action] = useFormState(passwordLost, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (state.ok) {
            const userConfirmed = window.confirm(state.response?.message + "\nClick OK to go to the homepage.")
            if (userConfirmed) router.push("/")
        }
    }, [router, state])

    return (
        <form className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0" action={action}>
            <div className="pb-2 pt-4">
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <div className="my-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    aria-label="Send password reset link"
                    disabled={pending}
                    aria-disabled={pending}
                >
                    {pending ? "Sending..." : "Send Link"}
                </FormButton>
            </div>
        </form>
    )
}
