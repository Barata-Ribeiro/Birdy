"use client"

import isUserFollowing from "@/actions/user/get-is_user_following"
import userFollow from "@/actions/user/post-user-follow"
import userUnfollow from "@/actions/user/post-user-unfollow"
import FormButton from "@/components/utils/form-button"
import { PublicProfileResponse } from "@/interfaces/api/users"
import { type MouseEvent, useEffect, useState } from "react"
import { useUser } from "@/context/user-context"

interface FollowingComponentProps {
    profile: PublicProfileResponse
}

export default function FollowingComponent({ profile }: Readonly<FollowingComponentProps>) {
    const [tooltipMessage, setTooltipMessage] = useState("")
    const [showTooltip, setShowTooltip] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followerCount, setFollowerCount] = useState(profile.follower_count)
    const { user } = useUser()

    const disabledFollowing = isLoading || !user || user.id === profile.id

    useEffect(() => {
        if (!user) return

        const checkFollowing = async () => {
            const loggedInUserFollowingState = await isUserFollowing(profile.username, user.id)

            if (loggedInUserFollowingState.ok) {
                const data = loggedInUserFollowingState.response?.data as {
                    followed_by_loggedIn_user: boolean
                }

                setIsFollowing(data.followed_by_loggedIn_user)
                setIsLoading(false)
            }
        }

        checkFollowing().then((r) => r)
    }, [profile.username, user])

    const handleFollowing = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!user) return
        setIsLoading(true)

        const followId = profile.id
        const userId = user.id

        const followState = isFollowing ? await userUnfollow(userId, followId) : await userFollow(userId, followId)
        const message = followState.response?.message ?? followState.client_error ?? "Something went wrong."

        if (followState.ok) {
            setIsFollowing(!isFollowing)
            setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1))
        }

        setTooltipMessage(message)
        setShowTooltip(true)
        setIsLoading(false)

        setTimeout(() => setShowTooltip(false), 3000)
    }

    const verifyIfFollowingAndSetLabel = isFollowing ? "Unfollow" : "Follow"

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

            <span className="dark:text-green-spring-600">{followerCount} follower(s)</span>
        </div>
    )
}
