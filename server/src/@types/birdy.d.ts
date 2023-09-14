/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { Photo } from "../entities/Photo";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";

declare module "express" {
  export interface Request {
    user?: UserWithoutPassword;
    cookies: Cookies;
  }
}

declare module "streamifier" {
  export function createReadStream(buffer: Buffer): NodeJS.ReadableStream;
}

export type UserWithoutPassword = Omit<User, "password">;

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

export interface PhotoResponse {
  id: number;
  url: string;
  title: string;
  authorID: User["id"];
  size: number;
  habitat: string;
}

export interface CreateUserRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export type JwtPayload = {
  id: string;
};

export interface PhotoRequestBody {
  title: string;
  size: number;
  habitat: string;
}

export interface PhotoStats {
  id: number;
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
