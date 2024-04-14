"use client"

import adminDeletePhoto from "@/actions/admin/admin-delete-photo"
import deletePhoto from "@/actions/photos/delete-photo"
import { PhotoResponse } from "@/interfaces/api/photos"
import { UserContextResponse } from "@/interfaces/api/users"
import tw from "@/utils/tw"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { twMerge } from "tailwind-merge"

interface DeleteButtonProps {
    user: UserContextResponse
    photo?: PhotoResponse
    comment?: any
    direction?: "left" | "right"
}

export default function DeleteButton({
    user,
    photo,
    comment,
    direction
}: DeleteButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const toolTipClasses = tw`absolute bottom-2 z-20 mt-2 rounded border border-green-spring-200 bg-white p-2 shadow dark:border-green-spring-600 dark:bg-green-spring-700`
    const directionClass = `${direction}-2`
    const mergedClasses = twMerge(toolTipClasses, directionClass)

    const handleDeleteClick = () => setShowConfirm(true)

    const handleConfirm = async () => {
        setLoading(true)

        if (user) {
            if (photo) {
                if (user.role === "ADMIN") await adminDeletePhoto(photo.id)
                else await deletePhoto(photo.id)
            }
            // if (comment) {
            //     if (user.role === "ADMIN") await adminDeleteComment(comment.id)
            //     else await deleteComment(comment.id)
            // }

            setLoading(false)

            window.location.href = `/dashboard/${user.id}/${user.username}`
        }

        setShowConfirm(false)
    }

    const handleCancel = () => setShowConfirm(false)

    return (
        <div className="relative">
            <button
                onClick={handleDeleteClick}
                className="flex items-center justify-center p-1 text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-500 dark:hover:text-red-600"
                aria-label="Delete"
                title="Delete"
                disabled={loading || showConfirm}
                aria-disabled={loading || showConfirm}
            >
                <FaTrash />
            </button>

            {showConfirm && (
                <div className={mergedClasses}>
                    <p className="text-sm text-green-spring-700 dark:text-green-spring-300">
                        Confirm deletion?
                    </p>
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
