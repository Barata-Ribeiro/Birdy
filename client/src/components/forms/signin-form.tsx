"use client"

import login from "@/actions/auth/login"
import Error from "@/components/utils/error"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import Link from "next/link"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function SignInForm() {
    const { pending } = useFormStatus()
    const [state, action] = useFormState(login, {
        ok: false,
        client_error: null,
        response: null,
        username: null
    })

    useEffect(() => {
        if (state.ok && state.username)
            window.location.href = `/dashboard/${state.username}`
    }, [state.ok])

    return (
        <form
            action={action}
            className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0"
        >
            <div className="pb-2 pt-4">
                <Input
                    label="Username"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <div className="pb-2 pt-4">
                <Input
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <Error error={state.client_error} />
            <div className="text-right">
                <Link
                    href="/sign/password-lost"
                    className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                >
                    Forgot your password?
                </Link>
            </div>
            <div className="px-4 pb-2 pt-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    disabled={pending}
                    aria-disabled={pending}
                >
                    {pending ? "Loading..." : "Sign In"}
                </FormButton>
            </div>
            <div className="mt-2 text-center">
                <Link
                    href="/sign/up"
                    className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                >
                    Don&apos;t have an account? Sign Up!
                </Link>
            </div>
        </form>
    )
}
