"use client"

import deletePrivateProfile from "@/actions/user/delete-private-profile"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import { UserContextResponse } from "@/interfaces/api/users"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function DashboardDelete({
    data
}: Readonly<{
    data: UserContextResponse
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

    return (
        <>
            <p className="text-center">Are you sure you want to delete your account? This action cannot be undone.</p>
            <p className="text-center">
                All your data will be <span className="font-bold">permanently deleted</span>. If you are sure you want
                to delete your account, please enter the required information below and click the &rdquo;Delete
                Account&ldquo; button. If you are not sure, you can click the &rdquo;Cancel&ldquo; button to return to
                your dashboard.
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
                    <input type="hidden" name="userId" id="userId" value={data.id} />
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
                        onClick={() => (window.location.href = `/dashboard/${data.id}/${data.username}`)}
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
