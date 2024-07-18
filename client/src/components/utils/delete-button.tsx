"use client"

import adminDeleteComment from "@/actions/admin/admin-delete-comment"
import deleteComment from "@/actions/comments/delete-comment"
import { PhotoComment, PhotoResponse } from "@/interfaces/api/photos"
import tw from "@/utils/tw"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useUser } from "@/context/user-context"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import adminDeletePhoto from "@/actions/admin/admin-delete-photo"
import deletePhoto from "@/actions/photos/delete-photo"

interface DeleteButtonProps {
    photo?: PhotoResponse
    comment?: PhotoComment
    direction?: "left" | "right"
}

function ButtonLoading() {
    return (
        <>
            <svg
                aria-hidden="true"
                className="me-3 inline h-4 w-4 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                />
            </svg>
            Loading...
        </>
    )
}

export default function DeleteButton({ photo, comment, direction }: Readonly<DeleteButtonProps>) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Handling logged in User
    const { user } = useUser()
    const userId = user ? user.id : null
    const isPhotoOwner = userId && photo?.author.id === userId
    const isCommentOwner = userId && comment?.author_id === userId
    const isAdmin = user?.role.toString() === "1"

    const toolTipClasses = tw`absolute bottom-4 z-20 mt-2 rounded border border-green-spring-200 bg-white p-2 shadow dark:border-green-spring-600 dark:bg-green-spring-700`
    const directionClass = direction === "left" ? "left-6" : "right-6"
    const mergedClasses = twMerge(directionClass, toolTipClasses)

    const handleDeleteClick = () => setShowConfirm(true)

    const handleConfirm = async () => {
        setIsLoading(true)

        try {
            if (photo && user) {
                const deleteAction = isAdmin && !isPhotoOwner ? adminDeletePhoto : deletePhoto
                await deleteAction(photo.id)
                window.location.href = `/dashboard/${user.id}/${user.username}`
            } else if (comment) {
                const deleteAction = isAdmin && !isCommentOwner ? adminDeleteComment : deleteComment
                await deleteAction(comment.photo_id, comment.id)
                router.refresh()
            }
        } catch (error) {
            console.error("Error deleting: ", error)
        } finally {
            setShowConfirm(false)
            setIsLoading(false)
        }
    }

    const handleCancel = () => setShowConfirm(false)

    if (!(isAdmin || isPhotoOwner || isCommentOwner)) return null

    return (
        <div className="relative self-start md:self-auto">
            <button
                type="button"
                onClick={handleDeleteClick}
                className="flex items-center justify-center rounded bg-mantis-100 p-2 text-red-600 hover:bg-red-100 hover:text-red-700 active:bg-red-200 disabled:opacity-50 dark:text-red-500 dark:hover:text-red-600"
                aria-label="Delete"
                title="Delete"
                disabled={isLoading || showConfirm}
                aria-disabled={isLoading || showConfirm}
            >
                <FaTrash />
            </button>

            {showConfirm && (
                <div className={mergedClasses}>
                    <p className="text-sm text-green-spring-700 dark:text-green-spring-300">Confirm deletion?</p>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={handleCancel}
                            className="cursor-pointer rounded bg-green-spring-200 px-3 py-1 text-sm text-green-spring-500 hover:bg-green-spring-300 dark:bg-green-spring-600 dark:text-green-spring-400 dark:hover:bg-green-spring-500"
                            aria-label="Cancel deletion"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex cursor-pointer items-center rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:cursor-default disabled:opacity-50"
                            aria-label="Confirm deletion"
                            disabled={isLoading}
                            aria-disabled={isLoading}
                        >
                            {isLoading ? <ButtonLoading /> : "Delete"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
