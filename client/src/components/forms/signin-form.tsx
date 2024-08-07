"use client"

import login from "@/actions/auth/login"
import ErrorElement from "@/components/utils/error-element"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import FormSocialButtons from "@/components/utils/form-social-buttons"
import { useForm } from "@/hooks/use-form"

export default function SignInForm() {
    const router = useRouter()
    const { isPending, formState, formAction, onSubmit } = useForm(login, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (formState.ok) {
            const data = formState.response?.data as {
                id: string
                username: string
                role: "0" | "1" | "2" | "3"
            }
            router.push(`/dashboard/${data.id}/${data.username}`)
        }
    }, [router, formState])

    return (
        <form action={formAction} onSubmit={onSubmit} className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0">
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
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-green-spring-50 dark:text-green-spring-400 lg:text-green-spring-600">
                    <input
                        className="h-4 w-4 rounded border-green-spring-300 bg-green-spring-100 text-bright-turquoise-600 focus:ring-2 focus:ring-bright-turquoise-500 dark:border-green-spring-600 dark:bg-green-spring-700 dark:ring-offset-green-spring-800 dark:focus:ring-bright-turquoise-600"
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                    />
                    {/* */}
                    Remember me
                </label>

                <Link
                    href="/sign/password-lost"
                    className="leading-none text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                >
                    Forgot your password?
                </Link>
            </div>
            <ErrorElement error={formState.client_error} />
            <div className="my-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    aria-label="Sign In"
                    disabled={isPending}
                    aria-disabled={isPending}
                >
                    {isPending ? "Loading..." : "Sign In"}
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

            <FormSocialButtons />
        </form>
    )
}
