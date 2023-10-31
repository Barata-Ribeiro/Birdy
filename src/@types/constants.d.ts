// AUTHENTICATION TYPES
export type authLoginRequest = {
	email: string;
	password: string;
};

export type authForgotPasswordRequest = { email: string };

export type authResetPasswordRequest = {
	password: string;
};

// USER TYPES
export type userCreateRequest = {
	username: string;
	email: string;
	password: string;
};

export type userEditProfileRequest = {
	username?: string;
	password?: string;
	newPassword?: string;
	avatarUrl?: string;
	coverImageUrl?: string;
	biography?: string;
};

// ADMIN TYPES
export type adminGetUserByUsername = { username: string };

// COMMENT TYPES
export type userCreateComment = { comment: string };
