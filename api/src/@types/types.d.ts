/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";

// External Imports
import { User } from "../entities/User";

// Module Augmentation Declarations
declare module "express" {
  export interface Request {
    user?: UserWithoutPassword;
    cookies: Cookies;
  }
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

// Utility Types
export type UserWithoutPassword = Omit<User, "password">;

// Miscellaneous Types
export type JwtPayload = {
  id: string;
};

export interface PhotoStats {
  id: string;
  title: string;
  comments: number;
  hits: number;
  likes: number;
}

type CloudinaryResult = {
  secure_url: string;
};

export interface Cookies {
  jwt?: {
    refreshToken: string;
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
