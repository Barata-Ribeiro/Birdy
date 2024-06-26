"use client"

import isUserFollowing from "@/actions/user/get-is_user_following"
import userFollow from "@/actions/user/post-user-follow"
import userUnfollow from "@/actions/user/post-user-unfollow"
import FormButton from "@/components/utils/form-button"
import { PublicProfileResponse, UserContextResponse } from "@/interfaces/api/users"
import { type MouseEvent, useEffect, useState } from "react"

interface FollowingComponentProps {
    profile: PublicProfileResponse
    user?: UserContextResponse | null
}

export default function FollowingComponent({
    profile,
    user
}: Readonly<FollowingComponentProps>) {
    const [tooltipMessage, setTooltipMessage] = useState("")
    const [showTooltip, setShowTooltip] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const disabledFollowing = isLoading || !user || user.id === profile.id

    useEffect(() => {
        if (!user) return

        const checkFollowing = async () => {
            const loggedInUserFollowingState = await isUserFollowing(
                profile.username,
                user.id
            )

            if (loggedInUserFollowingState.ok) {
                const data = loggedInUserFollowingState.response?.data as {
                    followed_by_loggedIn_user: boolean
                }

                setIsFollowing(data.followed_by_loggedIn_user)
            }
        }

        checkFollowing()
    }, [profile.username, user])

    const handleFollowing = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!user) return
        setIsLoading(true)

        const followId = profile.id
        const userId = user.id

        const followState = isFollowing
            ? await userFollow(userId, followId)
            : await userUnfollow(userId, followId)

        const message =
            followState.response?.message ??
            followState.client_error ??
            "Something went wrong."

        if (followState.ok) setIsFollowing(!isFollowing)

        setTooltipMessage(message)
        setShowTooltip(true)
        setIsLoading(false)

        setTimeout(() => setShowTooltip(false), 3000)
    }

    let verifyIfFollowingAndSetLabel = isFollowing ? "Unfollow" : "Follow"
    
    return (
        <div className="mt-16 flex items-center justify-between px-3 py-6 sm:mt-0">
            {showTooltip && (
                <div className="absolute left-1/2 top-0 z-10 mt-2 -translate-x-1/2 rounded-md bg-green-spring-600 p-2 text-sm text-white shadow-md dark:bg-bright-turquoise-600">
                    {tooltipMessage}
                </div>
            )}

            <FormButton
                className="!w-auto rounded-lg px-4 py-2"
                onClick={handleFollowing}
                aria-label={verifyIfFollowingAndSetLabel}
                disabled={disabledFollowing}
                aria-disabled={disabledFollowing}
            >
                {isLoading ? "Loading..." : verifyIfFollowingAndSetLabel}
            </FormButton>

            <span className="dark:text-green-spring-600">
                {profile.follower_count} follower(s)
            </span>
        </div>
    )
}
