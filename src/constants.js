export const __API_URL__ =
	import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

//AUTHENTICATION CONSTANTS
/**
 * Returns a request object for making a POST request to log in a user.
 *
 * @param {Object} body - The login data
 * @param {string} body.email - The user's email address.
 * @param {string} body.password - The user's password.
 * @returns {Object} The request object
 */
export const AUTH_LOGIN = (body) => {
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
 * Returns a request object for making a POST request to refresh the user's access token.
 *
 * @returns {Object} The request object
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
 * Returns a request object for making a POST request to log out the user.
 *
 * @returns {Object} The request object
 */
export const AUTH_LOGOUT = () => {
	return {
		url: `${__API_URL__}/auth/logout`,
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
 * Returns a request object for making a POST request to forgot the password of a user.
 *
 * @param {Object} body - The email data
 * @param {string} body.email - The user's email address.
 * @returns {Object} The request object
 */
export const AUTH_FORGOT_PASSWORD = (body) => {
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
 * Returns a request object for making a POST request to reset the password of a user.
 *
 * @param {number} userId - The ID of the user to reset the password for
 * @param {string} token - The password reset token
 * @param {Object} body - The password data
 * @param {string} body.password - The user's new password.
 * @param {string} body.passwordConfirmation - The user's new password confirmation.
 * @returns {Object} The request object
 */
export const AUTH_RESET_PASSWORD = (userId, token, body) => {
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
 * Returns a request object for making a POST request to create a new user.
 *
 * @param {Object} body - The user data to create
 * @param {string} body.username - The user's username.
 * @param {string} body.email - The user's email address.
 * @param {string} body.password - The user's password.
 * @returns {Object} The request object
 */
export const USER_CREATE = (body) => {
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
 * Returns a request object for making a GET request to retrieve all users.
 *
 * @returns {Object} The request object
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
 * Returns a request object for making a GET request to retrieve a user by their ID.
 *
 * @param {number} userId - The ID of the user to retrieve
 * @returns {Object} The request object
 */
export const USER_GET_BY_ID = (userId) => {
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
 * Edits the user's profile.
 *
 * @param {object} body - The information to update.
 * @param {string} body.username - The new username (if available).
 * @param {string} body.password - The new password.
 * @param {string} body.avatarUrl - The new avatar (if available).
 * @param {string} body.coverImageUrl - The new cover image (if available).
 * @param {string} body.bio - The new bio.
 * @param {string} token - The user's access token.
 */
export const USER_EDIT_PROFILE = (body, token) => {
	return {
		url: `${__API_URL__}/users/`,
		options: {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
			body: JSON.stringify(body),
		},
	};
};

/**
 * Deletes the user's account.
 *
 * @param {string} token - The user's access token.
 */
export const USER_DELETE_OWN_ACCOUNT = (token) => {
	return {
		url: `${__API_URL__}/users/delete-account`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

// PROFILE CONSTANT
/**
 * Retrieves the user's own profile statistics.
 *
 * @param {string} token - The user's access token.
 */
export const GET_OWN_PROFILE_STATS = (token) => {
	return {
		url: `${__API_URL__}/profile/`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

// ADMIN CONSTANTS
/**
 * Retrieves a user by their username.
 * Only accessible by users with admin privileges.
 *
 * @param {object} body - The username of the user to retrieve.
 * @param {string} body.username - The username of the user to retrieve.
 * @param {string} token - The user's access token.
 */
export const ADMIN_GET_USER_BY_USERNAME = (body, token) => {
	return {
		url: `${__API_URL__}/admin/`,
		options: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
			credentials: "include",
		},
	};
};

/**
 * Deletes a comment with the specified ID from the database.
 * Only accessible by users with admin privileges.
 *
 * @param {string} photoId - The ID of the photo the comment belongs to.
 * @param {string} commentId - The ID of the comment to delete.
 * @param {string} token - The user's access token.
 */
export const ADMIN_DELETE_COMMENT_BY_ID = (photoId, commentId, token) => {
	return {
		url: `${__API_URL__}/admin/${photoId}/comments/${commentId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

/**
 * Deletes a photo with the specified ID from the database.
 * Only accessible by users with admin privileges.
 *
 * @param {string} photoId - The ID of the photo to delete.
 * @param {string} token - The user's access token.
 */
export const ADMIN_DELETE_PHOTO_BY_ID = (photoId, token) => {
	return {
		url: `${__API_URL__}/admin/${photoId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

/**
 * Deletes a user from the database based on the given user ID and authentication token.
 *
 * @param {string} userId - The ID of the user to be deleted.
 * @param {string} token - The authentication token of the user making the request.
 * @returns {Object} - The request configuration object.
 */
export const ADMIN_DELETE_USER_BY_ID = (userId, token) => {
	return {
		url: `${__API_URL__}/admin/${userId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

// COMMENT CONSTANTS
/**
 * Creates a new comment for a photo.
 *
 * @param {number} photoId - The ID of the photo to create the comment for.
 * @param {string} token - The access token for the user making the request.
 * @param {object} body - The body of the comment to create.
 * @returns {object} The response from the API.
 */
export const COMMENT_CREATE = (photoId, token, body) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/comments`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
			body: JSON.stringify(body),
		},
	};
};

// COMEÇOU AQUI
/**
 * Returns a request object for making a GET request to retrieve all comments for a specific photo.
 *
 * @param {string} photoId - The ID of the photo for which to retrieve comments.
 *
 * @returns {Object} - The request object with the necessary properties to make the request.
 */
export const COMMENT_GET_ALL = (photoId) => {
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
 * Returns a request object for making a GET request to retrieve a specific comment for a photo.
 *
 * @param {number} photoId - The ID of the photo to retrieve the comment for.
 * @param {number} commentId - The ID of the comment to retrieve.
 *
 * @returns {Object} - The request object with the necessary properties to make the request.
 */
export const COMMENT_GET_BY_ID = (photoId, commentId) => {
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
 * Deletes a comment from a photo.
 *
 * @param {number} photoId - The ID of the photo the comment is associated with.
 * @param {number} commentId - The ID of the comment to be deleted.
 * @param {string} token - The user's access token.
 */
export const COMMENT_DELETE_BY_ID = (photoId, commentId, token) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/comments/${commentId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

// USER LIKING CONSTANT
/**
 * Creates an object that represents a request to toggle a like for a photo.
 *
 * @param {number} photoId - The ID of the photo to toggle the like for.
 * @param {string} token - The authentication token for the user.
 *
 * @returns {Object} The request object.
 */

export const TOGGLE_LIKE = (photoId, token) => {
	return {
		url: `${__API_URL__}/photos/${photoId}/like`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};

// USER PHOTO CONSTANTS
/**
 * Creates a new photo post request to be sent to the backend.
 *
 * @param {string} token - The user's access token.
 * @param {FormData} formData - The form data containing the photo to be posted.
 *
 * @returns {Object} - The request configuration object with the URL and options.
 */
export const PHOTO_POST = (token, formData) => {
	return {
		url: `${__API_URL__}/photos/`,
		options: {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
			body: formData,
		},
	};
};

/**
 * Returns a GET request to fetch all photos, along with any additional parameters such as page and limit.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of photos to fetch per page.
 * @param {string} userId - The ID of the user for which to fetch photos.
 */
export const PHOTOS_GET_ALL = (page = 1, limit = 5, userId) => {
	const queryParams = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		...(userId && { userId }),
	});
	return {
		url: `${__API_URL__}/photos/?${queryParams}`,
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
 * Returns a request object for making a GET request to retrieve a photo by its ID.
 *
 * @param {string} photoId - The ID of the photo to retrieve.
 * @returns {Object} The request object.
 */
export const PHOTOS_GET_BY_ID = (photoId) => {
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
 * Creates an object containing the necessary information to make a DELETE request to the /photos endpoint
 * @param {string} photoId - The ID of the photo to be deleted
 * @param {string} token - The user's authentication token
 */
export const PHOTO_DELETE = (photoId, token) => {
	return {
		url: `${__API_URL__}/photos/${photoId}`,
		options: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		},
	};
};
