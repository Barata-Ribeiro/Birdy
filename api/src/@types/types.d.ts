/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

// External Imports
import { User } from "../entities/User";

// Module Augmentation Declarations
declare module "express" {
	export interface Request {
		user?: UserWithoutPassword;
		cookies: Cookies;
	}
}

export interface EditProfileRequest extends Request {
	body: EditUserRequestBody;
}

declare module "streamifier" {
	export function createReadStream(buffer: Buffer): NodeJS.ReadableStream;
}

// API Request and Response Definitions
export interface CreateUserRequestBody {
	username: string;
	email: string;
	password: string;
}

export interface LoginRequestBody {
	email: string;
	password: string;
}

export interface PhotoRequestBody {
	title: string;
	size: number;
	habitat: string;
}

export interface EditUserRequestBody {
	username?: string;
	password?: string;
	newPassword?: string;
	avatarUrl?: string;
	coverImageUrl?: string;
	biography?: string;
}

// Utility Types
export type UserWithoutPassword = Omit<User, "password">;

// Miscellaneous Types
export type JwtPayload = {
	id: string;
};

type CloudinaryResult = {
	secure_url: string;
};

export interface Cookies {
	jwt?: {
		refreshToken: string;
	};
	viewedPhotos?: {
		[photoId: string]: boolean;
	};
}

export type AuthTokens = {
	accessToken: string;
	refreshToken?: string;
};

export type MiddlewareFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;

export interface CloudinaryCallbackResult {
	result?: string;
}
