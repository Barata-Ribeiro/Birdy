"use client"

import register from "@/actions/auth/register"
import ErrorElement from "@/components/utils/error-element"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import Link from "next/link"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import FormSocialButtons from "@/components/utils/form-social-buttons"

export default function SignUpForm() {
    const { pending } = useFormStatus()
    const [state, action] = useFormState(register, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (state.ok) window.location.href = "/sign/in"
    }, [state.ok])

    return (
        <form action={action} className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0">
            <div className="pb-2 pt-4">
                <Input
                    label="Username"
                    name="username"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <div className="pb-2 pt-4">
                <Input
                    label="Display Name"
                    name="displayName"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
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
            <div className="flex items-center justify-end gap-2">
                <input
                    className="h-4 w-4 rounded border-green-spring-300 bg-green-spring-100 text-bright-turquoise-600 focus:ring-2 focus:ring-bright-turquoise-500 dark:border-green-spring-600 dark:bg-green-spring-700 dark:ring-offset-green-spring-800 dark:focus:ring-bright-turquoise-600"
                    type="checkbox"
                    name="terms-of-use"
                    id="terms-of-use"
                    required
                    aria-required
                />{" "}
                <label
                    htmlFor="terms-of-use"
                    className="text-left text-green-spring-50 dark:text-green-spring-50 lg:text-green-spring-950"
                >
                    I&apos;ve read and accepted the{" "}
                    <Link
                        href="/terms-of-use"
                        className="font-semibold text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                    >
                        Terms of Use
                    </Link>
                    .
                </label>
            </div>
            <div className="my-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    aria-label="Create Account"
                    disabled={pending}
                    aria-disabled={pending}
                >
                    {pending ? "Creating..." : "Create Account"}
                </FormButton>
            </div>
            <ErrorElement error={state.client_error} />
            <div className="mt-2 text-center">
                <Link
                    href="/sign/in"
                    className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                >
                    Already a member? Login!
                </Link>
            </div>

            <FormSocialButtons />
        </form>
    )
}
