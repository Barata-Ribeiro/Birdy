"use client"

import postToggleLike from "@/actions/photos/post-toggle-photo-like"
import { PhotoResponse, ToggleLikeResponse } from "@/interfaces/api/photos"
import { useEffect, useState } from "react"
import "./like-button.css"
import { useUser } from "@/context/user-context"

interface LikeButtonProps {
    photo: PhotoResponse
}

export default function LikeButton({ photo }: Readonly<LikeButtonProps>) {
    const [totalLikes, setTotalLikes] = useState(photo.likes.length)
    const [usedKeyboard, setUsedKeyboard] = useState(false)
    const [loading, setLoading] = useState(false)

    // Handling logged in User
    const { user } = useUser()
    const userId = user ? user.id : null
    const isPhotoOwner = photo?.author.id === userId
    const isAdmin = user?.role.toString() === "1"
    const disabledCondition = loading || isPhotoOwner || (isAdmin && isPhotoOwner)

    const isPhotoLiked = user && photo.likes.some((like) => like.user_id === user.id)
    const [likeState, setLikeState] = useState(isPhotoLiked ? "Liked" : "Unliked")

    async function toggleLike() {
        if (loading) return

        try {
            setLoading(true)

            const state = await postToggleLike(photo.id)
            const like = state.response?.data as ToggleLikeResponse

            if (state.ok) {
                setTotalLikes((prev) => (like.is_liked ? prev + 1 : prev - 1))
                setLikeState(like.is_liked ? "Liked" : "Unliked")
            }
        } catch (error) {
            console.error("Error while toggling like: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleTabPress = () => setUsedKeyboard(true)
        window.addEventListener("keydown", handleTabPress)
        return () => window.removeEventListener("keydown", handleTabPress)
    }, [])

    return (
        <span aria-label="Number of likes and like button" className="flex items-center gap-1">
            <button
                className={`like ${likeState.toLowerCase()} ${
                    !usedKeyboard && "focus:outline-none"
                } disabled:cursor-default disabled:opacity-50`}
                onClick={toggleLike}
                disabled={disabledCondition}
            >
                <span className="like-icon like-icon-state" aria-label={likeState} aria-live="polite">
                    {likeState}
                </span>
            </button>

            {totalLikes}
        </span>
    )
}
