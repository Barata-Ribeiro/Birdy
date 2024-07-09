"use client"

import deletePrivateProfile from "@/actions/user/delete-private-profile"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useUser } from "@/context/user-context"
import { notFound } from "next/navigation"

export default function DashboardDelete({
    params
}: Readonly<{
    params: { userId: string; username: string }
}>) {
    const { pending } = useFormStatus()
    const [state, action] = useFormState(deletePrivateProfile, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (state.ok) window.location.href = "/"
    }, [state.ok])

    const { user } = useUser()
    if (!user) return notFound()
    if (params.userId !== user.id || params.username !== user.username) return notFound()

    return (
        <>
            <p className="text-center">Are you sure you want to delete your account? This action cannot be undone.</p>
            <p className="mx-auto max-w-4xl text-center">
                All your data will be <strong className="uppercase">permanently deleted</strong>. If you are sure you
                want to delete your account, please enter the required information below and click the &rdquo;{/* */}
                <strong>Delete Account</strong>&ldquo; button. If you are not sure, you can click the &rdquo;{/* */}
                <strong>Cancel</strong>&ldquo; button to return to your dashboard.
            </p>
            <form action={action} className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0">
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
                        type="password"
                        label="Password"
                        autoComplete="current-password"
                        className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="pb-2 pt-4">
                    <Input
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        autoComplete="off"
                        className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                        required
                        aria-required
                    />
                </div>
                <div className="flex justify-center gap-2 pt-4 sm:justify-end">
                    <input type="hidden" name="userId" id="userId" value={user.id} />
                    <FormButton
                        type="submit"
                        className="rounded !bg-red-600 px-4 py-2 hover:!bg-red-400 sm:!w-fit"
                        aria-label="Delete Account"
                        disabled={pending}
                        aria-disabled={pending}
                    >
                        {pending ? "Deleting..." : "Delete Account"}
                    </FormButton>
                    <FormButton
                        type="button"
                        onClick={() => (window.location.href = `/dashboard/${user.id}/${user.username}`)}
                        className="dark:!hover:bg-green-spring-700 rounded !bg-green-spring-300 px-4 py-2 hover:!bg-green-spring-400 dark:!bg-green-spring-600 sm:!w-fit"
                        disabled={pending}
                        aria-disabled={pending}
                    >
                        Cancel
                    </FormButton>
                </div>
            </form>
        </>
    )
}
