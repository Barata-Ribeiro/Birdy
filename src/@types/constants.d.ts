// AUTHENTICATION TYPES
export type authLoginRequest = {
	email: string;
	password: string;
};

export type authForgotPasswordRequest = { email: string };

export type authResetPasswordRequest = {
	userId: string;
	token: string;
	body: string;
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
