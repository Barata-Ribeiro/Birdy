export type authLoginRequest = {
	email: string;
	password: string;
};

export type authForgotPassword = { email: string };

export type authResetPassword = {
	userId: string;
	token: string;
	body: string;
};
