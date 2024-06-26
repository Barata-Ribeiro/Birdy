"use client"

import postComment from "@/actions/comments/post-comment"
import DeleteButton from "@/components/utils/delete-button"
import ErrorElement from "@/components/utils/error-element"
import FormButton from "@/components/utils/form-button"
import { useUser } from "@/context/user-context"
import { PhotoComment } from "@/interfaces/api/photos"
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

interface PhotoCommentsProps {
    photoId: string
    comments: PhotoComment[]
}

export default function PhotoComments({
    photoId,
    comments: photoComments
}: Readonly<PhotoCommentsProps>) {
    const [comments, setComments] = useState(() => photoComments)
    const commentsSection = useRef<HTMLUListElement>(null)
    const [comment, setComment] = useState("")
    const { user } = useUser()

    const { pending } = useFormStatus()
    const [state, action] = useFormState(postComment, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (commentsSection.current)
            commentsSection.current.scrollTop =
                commentsSection.current.scrollHeight
    }, [photoComments])

    useEffect(() => {
        if (state.ok) {
            setComments((comments) => [
                ...comments,
                state.response?.data as PhotoComment
            ])
            setComment("")
        }
    }, [state.ok, state.response?.data])

    function formatDate(isoString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
        return new Date(isoString).toLocaleDateString("en-US", options)
    }

    return (
        <>
            <h2 className="font-heading mb-2 text-xl font-medium">Comments</h2>
            {comments.length > 0 ? (
                <ul
                    ref={commentsSection}
                    className="max-h-96 space-y-2 overflow-y-auto"
                    aria-live="polite"
                >
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            id={`${comment.id}_${comment.author_id}`}
                            className="grid grid-flow-row gap-2 border-b border-green-spring-100 p-2 last:border-b-0 dark:border-green-spring-500"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-body text-sm font-medium dark:text-green-spring-300">
                                    {comment.author_name}
                                </span>
                                <time
                                    dateTime={comment.created_at}
                                    className="text-xs text-green-spring-300 dark:text-green-spring-500"
                                >
                                    {formatDate(comment.created_at)}
                                </time>
                            </div>
                            <p className="font-normal">{comment.content}</p>
                            {user &&
                                (comment.author_id === user.id ||
                                    user.role === "ADMIN") && (
                                    <span>
                                        <DeleteButton
                                            direction="left"
                                            user={user}
                                            comment={comment}
                                        />
                                    </span>
                                )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-sm text-green-spring-300">
                    This photo has no comments yet.
                </p>
            )}
            <form action={action} className="mt-4" aria-label="Post a comment">
                <textarea
                    name="comment"
                    id="comment"
                    rows={3}
                    maxLength={350}
                    minLength={50}
                    className="w-full rounded-md border border-green-spring-100 p-2 text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 focus:outline-none"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    aria-label="Comment text"
                    aria-required
                    required
                ></textarea>
                <input
                    type="hidden"
                    name="photoId"
                    id="photoId"
                    value={photoId}
                />
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs" aria-live="assertive">
                        {350 - comment.length} characters remaining
                    </p>
                    <FormButton
                        type="submit"
                        className="rounded-md bg-mantis-600 py-2 text-white hover:bg-mantis-700 disabled:opacity-50"
                        aria-label="Post Comment"
                        disabled={pending}
                        aria-disabled={pending}
                    >
                        {pending ? "Commenting..." : "Comment"}
                    </FormButton>
                    <ErrorElement error={state.client_error} />
                </div>
            </form>
        </>
    )
}
