"use client"

import postComment from "@/actions/comments/post-comment"
import DeleteButton from "@/components/utils/delete-button"
import ErrorElement from "@/components/utils/error-element"
import FormButton from "@/components/utils/form-button"
import { PhotoComment } from "@/interfaces/api/photos"
import { useEffect, useRef, useState } from "react"
import { useForm } from "@/hooks/use-form"
import Link from "next/link"

interface PhotoCommentsProps {
    photoId: string
    comments: PhotoComment[]
}

export default function PhotoComments({ photoId, comments: photoComments }: Readonly<PhotoCommentsProps>) {
    const [comments, setComments] = useState(() => photoComments)
    const commentsSection = useRef<HTMLUListElement>(null)
    const [comment, setComment] = useState("")

    const { isPending, formState, formAction, onSubmit } = useForm(postComment, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (commentsSection.current) commentsSection.current.scrollTop = commentsSection.current.scrollHeight
    }, [photoComments])

    useEffect(() => {
        if (formState.ok) {
            setComments((comments) => [...comments, formState.response?.data as PhotoComment])
            setComment("")
        }
    }, [formState])

    function formatDate(isoString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }
        return new Date(isoString).toLocaleDateString("en-US", options)
    }

    return (
        <>
            <h2 className="font-heading mb-2 text-xl font-medium">Comments</h2>
            {comments.length > 0 ? (
                <ul ref={commentsSection} className="max-h-96 space-y-2 overflow-y-auto" aria-live="polite">
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            id={`${comment.id}_${comment.author_id}`}
                            className="grid grid-flow-row gap-2 border-b border-green-spring-100 p-2 last:border-b-0 dark:border-green-spring-500"
                        >
                            <div className="flex items-center justify-between">
                                <Link
                                    href={"/user/" + comment.author_id + "/" + comment.author_username}
                                    className="font-body text-sm font-bold dark:text-green-spring-300"
                                >
                                    {comment.author_name}
                                </Link>
                                <time
                                    dateTime={comment.created_at}
                                    className="text-xs text-green-spring-300 dark:text-green-spring-500"
                                >
                                    {formatDate(comment.created_at)}
                                </time>
                            </div>
                            <p className="text-pretty font-normal leading-7">{comment.content}</p>
                            <DeleteButton direction="right" comment={comment} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-sm text-green-spring-300">This photo has no comments yet.</p>
            )}
            <form action={formAction} onSubmit={onSubmit} className="mt-4" aria-label="Post a comment">
                <textarea
                    name="comment"
                    id="comment"
                    rows={3}
                    maxLength={350}
                    minLength={10}
                    className="w-full rounded-md border border-green-spring-100 p-2 text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 focus:outline-none"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    aria-label="Comment text"
                    aria-required
                    required
                ></textarea>
                <input type="hidden" name="photoId" id="photoId" value={photoId} />
                <ErrorElement error={formState.client_error} />
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs" aria-live="assertive">
                        {350 - comment.length} characters remaining
                    </p>
                    <FormButton
                        type="submit"
                        className="rounded-md bg-mantis-600 py-2 text-white hover:bg-mantis-700 disabled:opacity-50"
                        aria-label="Post Comment"
                        disabled={isPending}
                        aria-disabled={isPending}
                    >
                        {isPending ? "Processing..." : "Comment"}
                    </FormButton>
                </div>
            </form>
        </>
    )
}
