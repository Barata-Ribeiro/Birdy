import {
	authForgotPassword,
	authLoginRequest,
	authResetPassword,
} from "./@types/constants";

export const __API_URL__: string = "http://localhost:3000/api/v1/";

//AUTHENTICATION CONSTANTS
/**
 * Authenticate a user with their email and password.
 * @param body - Request body containing the user's email and password.
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
 * @param body - Request body containing the user's email.
 */
export const AUTH_FORGOT_PASSWORD = (body: authForgotPassword) => {
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
 * @param userId - The user's ID.
 * @param token - The password reset token.
 * @param body - Request body containing the user's new password.
 */
export const AUTH_RESET_PASSWORD = ({
	userId,
	token,
	body,
}: authResetPassword) => {
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
