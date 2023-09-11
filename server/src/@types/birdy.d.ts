/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";

export type UserWithoutPassword = Omit<User, "password">;

declare module "express" {
  export interface Request {
    userId?: string;
    user?: UserWithoutPassword;
    cookies: Cookies;
  }
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

export interface PhotoStats {
  id: number;
  title: string;
  hits: number;
}

export interface Cookies {
  jwt?: {
    refreshToken: string;
  };
}

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};
