"use client"

import { PhotoResponse } from "@/interfaces/api/photos"
import { UserContextResponse } from "@/interfaces/api/users"
import { useEffect, useState } from "react"
import "./like-button.css"

interface LikeButtonProps {
    user: UserContextResponse | null
    photo: PhotoResponse
}

export default function LikeButton({ user, photo }: LikeButtonProps) {
    const [totalLikes, setTotalLikes] = useState(photo.likes.length)
    const [usedKeyboard, setUsedKeyboard] = useState(false)
    const [loading, setLoading] = useState(false)

    const isPhotoLiked =
        user && photo.likes.some((like) => like.user.id === user.id)
    const [likeState, setLikeState] = useState(
        isPhotoLiked ? "Liked" : "Unliked"
    )

    const isOwner = user && photo.author.id === user.id

    async function toggleLike() {
        if (loading) return
        setLoading(true)

        // TODO: Implement like/unlike functionality

        setLoading(false)
    }

    useEffect(() => {
        const handleTabPress = () => setUsedKeyboard(true)
        window.addEventListener("keydown", handleTabPress)
        return () => window.removeEventListener("keydown", handleTabPress)
    }, [])

    return (
        <span
            aria-label="Number of likes and like button"
            className="flex items-center gap-1"
        >
            <button
                className={`like ${likeState.toLowerCase()} ${
                    !usedKeyboard && "focus:outline-none"
                } disabled:cursor-not-allowed`}
                onClick={toggleLike}
                disabled={loading || !!isOwner}
            >
                <span
                    className="like-icon like-icon-state"
                    aria-label={likeState}
                    aria-live="polite"
                >
                    {likeState}
                </span>
            </button>

            {totalLikes}
        </span>
    )
}
