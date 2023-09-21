/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";

// External Imports
import { Photo } from "../entities/Photo";
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

// Entity Type Definitions
export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  photos: Photo[];
  refreshToken?: string;
}

export interface Photos {
  id: string;
  authorID: UserWithoutPassword["id"];
  authorName?: UserWithoutPassword["username"];
  title: string;
  date: Date;
  imageUrl: string;
  total_comments: number;
  comments: Comment[];
  meta: {
    size: number;
    habitat: string;
    access: number;
  };
}

export interface Comment {
  id: string;
  authorID: UserWithoutPassword["id"];
  authorName?: UserWithoutPassword["username"];
  content: string;
  date: Date;
  photo?: Photo;
}

export interface PhotoResponse {
  id: string;
  authorID: UserWithoutPassword["id"];
  url: string;
  title: string;
  size: number;
  habitat: string;
}

export interface CommentResponse {
  id: string;
  authorID: UserWithoutPassword["id"];
  content: string;
  date: Date;
  photo: PhotoResponse;
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
  hits: number;
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
