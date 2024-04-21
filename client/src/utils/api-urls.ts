import { FeedRequestParams } from "@/interfaces/api/photos"

const BACKEND_URL = process.env.BACKEND_ORIGIN || "http://localhost:3000"

// Auth
export const AUTH_REGISTER = () => `${BACKEND_URL}/api/v1/auth/register`
export const AUTH_LOGIN = () => `${BACKEND_URL}/api/v1/auth/login`
export const AUTH_REFRESHTOKEN = () =>
    `${BACKEND_URL}/api/v1/auth/refresh-token`
export const AUTH_FORGOTPASSWORD = () =>
    `${BACKEND_URL}/api/v1/auth/forgot-password`
export const AUTH_RESETPASSWORD = (userId: string, token: string) =>
    `${BACKEND_URL}/api/v1/auth/reset-password/${userId}/${token}`

// User
export const USER_GET_ALL = () => `${BACKEND_URL}/api/v1/users`
export const USER_GET_PROFILE = (username: string) =>
    `${BACKEND_URL}/api/v1/users/profile/${username}`
export const USER_GET_FOLLOWS = (username: string) =>
    `${BACKEND_URL}/api/v1/users/profile/${username}/follows`
export const USER_CHECK_FOLLOW = (username: string, userId: string) =>
    `${BACKEND_URL}/api/v1/users/profile/${username}/followed-by?logged_user_id=${userId}`
export const USER_GET_CONTEXT = () => `${BACKEND_URL}/api/v1/users/me/context`
export const USER_GET_PRIVATE_PROFILE = (userId: string) =>
    `${BACKEND_URL}/api/v1/users/me/${userId}`
export const USER_FOLLOW = (userId: string) =>
    `${BACKEND_URL}/api/v1/users/me/${userId}/follow`
export const USER_UPDATE_PRIVATE_PROFILE = (userId: string) =>
    `${BACKEND_URL}/api/v1/users/me/${userId}`
export const USER_UNFOLLOW = (userId: string) =>
    `${BACKEND_URL}/api/v1/users/me/${userId}/unfollow`
export const USER_DELETE_PRIVATE_PROFILE = (userId: string) =>
    `${BACKEND_URL}/api/v1/users/me/${userId}`

// Photo
export const PHOTO_GET_FEED = (params: FeedRequestParams) => {
    const { perPage, page, userId } = params
    let url = `${BACKEND_URL}/api/v1/photos?perPage=${perPage}&page=${page}`
    if (userId) url += `&userId=${userId}`
    return url
}
export const PHOTO_GET_PHOTO = (photoId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}`
export const PHOTO_GET_COMMENTS = (photoId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}/comments`
export const PHOTO_UPLOAD = () => `${BACKEND_URL}/api/v1/photos`
export const PHOTO_TOGGLE_LIKE = (photoId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}/like`
export const PHOTO_ADD_COMMENT = (photoId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}/comments`
export const PHOTO_UPDATE_COMMENT = (photoId: string, commentId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}/comments/${commentId}`
export const PHOTO_DELETE_COMMENT = (photoId: string, commentId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}/comments/${commentId}`
export const PHOTO_DELETE_PHOTO = (photoId: string) =>
    `${BACKEND_URL}/api/v1/photos/${photoId}`

// Admin
export const ADMIN_GET_USER_INFO = (username: string) =>
    `${BACKEND_URL}/api/v1/admin/users/${username}`
export const ADMIN_UPDATE_USER_INFO = (username: string) =>
    `${BACKEND_URL}/api/v1/admin/users/${username}`
export const ADMIN_UPDATE_USER_ROLE = (username: string) =>
    `${BACKEND_URL}/api/v1/admin/users/${username}/role`
export const ADMIN_BAN_USER = (username: string) =>
    `${BACKEND_URL}/api/v1/admin/users/${username}/ban`
export const ADMIN_DELETE_USER = (username: string) =>
    `${BACKEND_URL}/api/v1/admin/users/${username}`
export const ADMIN_DELETE_PHOTO = (photoId: string) =>
    `${BACKEND_URL}/api/v1/admin/photos/${photoId}`
export const ADMIN_UPDATE_COMMENT = (photoId: string, commentId: string) =>
    `${BACKEND_URL}/api/v1/admin/photos/${photoId}/comments/${commentId}`
export const ADMIN_DELETE_COMMENT = (photoId: string, commentId: string) =>
    `${BACKEND_URL}/api/v1/admin/photos/${photoId}/comments/${commentId}`
