"use client"

import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from "react-dom"
import passwordReset from "@/actions/auth/password-reset"
import { useEffect } from "react"
import Input from "@/components/utils/input"
import FormButton from "@/components/utils/form-button"
import ErrorElement from "@/components/utils/error-element"
import FormSocialButtons from "@/components/utils/form-social-buttons"

interface PasswordResetFormProps {
    userId: string
    token: string
}

export default function PasswordResetForm({ userId, token }: Readonly<PasswordResetFormProps>) {
    const router = useRouter()
    const { pending } = useFormStatus()
    const [state, action] = useFormState(passwordReset, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (state.ok) {
            const userConfirmed = window.confirm(state.response?.message + "\nClick OK to go to the sign in page.")
            if (userConfirmed) router.push("/sign/in")
        }
    }, [router, state])

    return (
        <form className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0" action={action}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="token" value={token} />
            <div className="pb-2 pt-4">
                <Input
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="new-password"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <div className="pb-2 pt-4">
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <div className="my-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    aria-label="Submit password reset form"
                    disabled={pending}
                    aria-disabled={pending}
                >
                    {pending ? "Reseting..." : "Reset Password"}
                </FormButton>
            </div>
            <ErrorElement error={state.client_error} />

            <FormSocialButtons />
        </form>
    )
}
