import {
	adminGetUserByUsername,
	authForgotPasswordRequest,
	authLoginRequest,
	authResetPasswordRequest,
	userCreateComment,
	userCreateRequest,
	userEditProfileRequest,
} from "./@types/constants";

export const __API_URL__: string =
	"http://localhost:3000/api/v1" || import.meta.env.env.API_URL.toString();

//AUTHENTICATION CONSTANTS
/**
 * Authenticate a user with their email and password.
 *
 * @param authLoginRequest body - Request body containing the user's email and password.
 */
export const AUTH_LOGIN = (body: authLoginRequest) => {
	return {
		url: `${__API_URL__}/auth/login`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(body),
		},
	};
};

/**
 * Refresh the user's access token. This is used to keep the user logged in.
 * It generates a new access token every 15 minutes, as long as the refresh
 * token is still valid.
 */
export const AUTH_REFRESH_TOKEN = () => {
	return {
		url: `${__API_URL__}/auth/token`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		},
	};
};

/**
 * Log the user out. The cookie will be deleted through the
 * http request method on the backend.
 */
export const AUTH_LOGOUT = () => {
	return {
		url: `${__API_URL__}/auth/logout`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		},
	};
};

/**
 * Request a password reset link.
 *
 * @param authForgotPasswordRequest body - Request body containing the user's email.
 */
export const AUTH_FORGOT_PASSWORD = (body: authForgotPasswordRequest) => {
	return {
		url: `${__API_URL__}/auth/forgot-password`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	};
};

/**
 * Reset the user's password.
 *
 * @param string userId - The user's ID.
 * @param string token - The password reset token.
 * @param authResetPasswordRequest body - Request body containing the user's new password.
 */
export const AUTH_RESET_PASSWORD = (
	userId: string,
	token: string,
	body: authResetPasswordRequest
) => {
	return {
		url: `${__API_URL__}/auth/reset-password/${userId}/${token}`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	};
};

// USER CONSTANTS
/**
 * Creates a new user account.
 *
 * @param userCreateRequest body - Request body containing the user's information.
 * It requires the username, email, and password.
 */
export const USER_CREATE = (body: userCreateRequest) => {
	return {
		url: `${__API_URL__}/users`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	};
};

/**
 * Get a list of all users. This is used preferred for pages that
 * require public information from one's profile.
 */
export const USER_GET_ALL = () => {
	return {
		url: `${__API_URL__}/users`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};
};

/**
 * Get information about a specific user. A preferred way of
 * aquiring the user's public profile information. And show it in
 * its own profile page.
 *
 * @param string userId - The user's ID.
 */
export const USER_GET_BY_ID = (userId: string) => {
	return {
		url: `${__API_URL__}/users/${userId}`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};
};

/**
 * Edit the user's profile. This route is used to update the user's information by
 * using optional parameters in the body. The user can edit its own 'username', 'password',
 * 'avatarUrl', 'coverImageUrl', and 'biography'.
 *
 * @param userEditProfileRequest body - Request body containing the user's updated information.
 * @param string token - The user's access token.
 */
export const USER_EDIT_PROFILE = (
	body: userEditProfileRequest,
	token: string
) => {
	return {
		url: `${__API_URL__}/users/`,
		options: {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		},
	};
};

/**
 * This request is where the user can delete their account. It is a permanent
 * action and cannot be undone. More information can be found in the
 * api files.
 *
 * @param string token - The user's access token.
 */
export const USER_DELETE_OWN_ACCOUNT = (token: string) => {
	return {
		url: `${__API_URL__}/users/delete-account`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

// PROFILE CONSTANT
/** *
 * Retrieve the user's profile stats such as the total views, comments, likes...
 *
 * @param string token - The user's access token.
 */
export const GET_OWN_PROFILE_STATS = (token: string) => {
	return {
		url: `${__API_URL__}/profile/`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

// ADMIN CONSTANTS
/**
 * An admin can get a certain user by searching for their username.
 *
 * @param adminGetUserByUsername body - Request body containing the username.
 * @param string token - The admin's access token.
 */
export const ADMIN_GET_USER_BY_USERNAME = (
	body: adminGetUserByUsername,
	token: string
) => {
	return {
		url: `${__API_URL__}/admin/`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		},
	};
};

/**
 * An admin can delete a comment by its ID. To be precise, this is assigned
 * to a button, allowing the admin to delete any comment in a particular post.
 *
 * @param string photoId - The photo ID.
 * @param string commentId - The comment ID.
 * @param string token - The admin's access token.
 */
export const ADMIN_DELETE_COMMENT_BY_ID = (
	photoId: string,
	commentId: string,
	token: string
) => {
	return {
		url: `${__API_URL__}/admin/${photoId}/comments/${commentId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

/**
 * An admin can delete a photo by its ID. To be precise, this is assigned
 * to a button, allowing the admin to delete the photo post from its page.
 *
 * @param string photoId - The photo ID.
 * @param string token - The user's access token.
 */
export const ADMIN_DELETE_PHOTO_BY_ID = (photoId: string, token: string) => {
	return {
		url: `${__API_URL__}/admin/${photoId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

/**
 * An admin can delete a user by its ID. For the admin to aquire a user's
 * ID, it must first require the user by its 'username' in the admin's dashboard.
 *
 * @param string userId - The user ID.
 * @param string token - The admin's access token.
 */
export const ADMIN_DELETE_USER_BY_ID = (userId: string, token: string) => {
	return {
		url: `${__API_URL__}/admin/${userId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

// COMMENT CONSTANTS
/**
 * Creates a new comment for the given photo.
 *
 * @param string photoId - The ID of the photo to create the comment for.
 * @param string token - The user's access token.
 * @param userCreateComment body - The comment to create.
 */
export const COMMENT_CREATE = (
	photoId: string,
	token: string,
	body: userCreateComment
) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/comments`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		},
	};
};

/**
 * Gets all comments for the given photo.
 *
 * @param string photoId - The ID of the photo to get the comments for.
 */
export const COMMENT_GET_ALL = (photoId: string) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/comments`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};
};

/**
 * Gets a specific comment for the given photo.
 *
 * @param string photoId - The ID of the photo to get the comment for.
 * @param string commentId - The ID of the comment to get.
 */
export const COMMENT_GET_BY_ID = (photoId: string, commentId: string) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/comments/${commentId}`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};
};

/**
 * Deletes a specific comment for the given photo.
 *
 * @param string photoId - The ID of the photo to delete the comment for.
 * @param string commentId - The ID of the comment to delete.
 * @param string token - The user's access token.
 */
export const COMMENT_DELETE_BY_ID = (
	photoId: string,
	commentId: string,
	token: string
) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/comments/${commentId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

// USER LIKING CONSTANT
/**
 * Function that returns the fetch's object to toggle the user's liking of a photo.
 *
 * @param string photoId - The ID of the photo to toggle the like for.
 * @param string token - The user's access token.
 */
export const TOGGLE_LIKE = (photoId: string, token: string) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/like`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};

// USER PHOTO CONSTANTS
/**
 * Function that returns the fetch's object for uploading a photo to the backend.
 *
 * @param string token - The user's access token.
 * @param FormData formData - The form data containing the photo to upload.
 */
export const PHOTO_POST = (token: string, formData: FormData) => {
	return {
		url: `${__API_URL__}/photos/`,
		options: {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		},
	};
};

/**
 * Function that returns the fetch's object containing the URL and options for making a GET request to retrieve a list of all photos.
 */
export const PHOTOS_GET_ALL = () => {
	return {
		url: `${__API_URL__}/photos/`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};
};

/**
 * Function that returns the fetch's object containing the URL and options for making a GET request to retrieve a specific photo based on its ID.
 *
 * @param photoId - The ID of the photo to retrieve
 */
export const PHOTOS_GET_BY_ID = (photoId: string) => {
	return {
		url: `${__API_URL__}/photos/${photoId}`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	};
};

/**
 * Function that returns the fetch's object containing the URL and options for making a DELETE request allowing a user to delete one of their own photos.
 *
 * @param string photoId - The ID of the photo to delete
 * @param string token - The user's access token.
 */
export const PHOTO_DELETE = (photoId: string, token: string) => {
	return {
		url: `${__API_URL__}/photos/${photoId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	};
};
