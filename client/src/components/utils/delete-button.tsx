"use client"

import adminDeleteComment from "@/actions/admin/admin-delete-comment"
import adminDeletePhoto from "@/actions/admin/admin-delete-photo"
import deleteComment from "@/actions/comments/delete-comment"
import deletePhoto from "@/actions/photos/delete-photo"
import { PhotoComment, PhotoResponse } from "@/interfaces/api/photos"
import tw from "@/utils/tw"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { twMerge } from "tailwind-merge"
import { useUser } from "@/context/user-context"

interface DeleteButtonProps {
    photo?: PhotoResponse
    comment?: PhotoComment
    direction?: "left" | "right"
}

export default function DeleteButton({ photo, comment, direction }: Readonly<DeleteButtonProps>) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    // Handling logged in User
    const { user } = useUser()
    const userId = user ? user.id : null
    const isOwner = userId && photo?.author.id === userId

    const toolTipClasses = tw`absolute bottom-4 z-20 mt-2 rounded border border-green-spring-200 bg-white p-2 shadow dark:border-green-spring-600 dark:bg-green-spring-700`
    const directionClass = `${direction}-6`
    const mergedClasses = twMerge(toolTipClasses, directionClass)

    const handleDeleteClick = () => setShowConfirm(true)

    const handleConfirm = async () => {
        setLoading(true)

        if (user) {
            if (photo) {
                if (user.role.toString() === "1") await adminDeletePhoto(photo.id)
                else await deletePhoto(photo.id)
            }
            if (comment) {
                if (user.role.toString() === "1") await adminDeleteComment(comment.photo_id, comment.id)
                else await deleteComment(comment.photo_id, comment.id)
            }

            setLoading(false)

            window.location.href = `/dashboard/${user.id}/${user.username}`
        }

        setShowConfirm(false)
    }

    const handleCancel = () => setShowConfirm(false)

    if (!isOwner || user?.role.toString() !== "1") return null

    return (
        <div className="relative self-start md:self-auto">
            <button
                onClick={handleDeleteClick}
                className="flex items-center justify-center rounded bg-mantis-100 p-2 text-red-600 hover:bg-red-100 hover:text-red-700 active:bg-red-200 disabled:opacity-50 dark:text-red-500 dark:hover:text-red-600"
                aria-label="Delete"
                title="Delete"
                disabled={loading || showConfirm}
                aria-disabled={loading || showConfirm}
            >
                <FaTrash />
            </button>

            {showConfirm && (
                <div className={mergedClasses}>
                    <p className="text-sm text-green-spring-700 dark:text-green-spring-300">Confirm deletion?</p>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={handleCancel}
                            className="rounded bg-green-spring-200 px-3 py-1 text-sm text-green-spring-500 hover:bg-green-spring-300 dark:bg-green-spring-600 dark:text-green-spring-400 dark:hover:bg-green-spring-500"
                            aria-label="Cancel deletion"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                            aria-label="Confirm deletion"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
