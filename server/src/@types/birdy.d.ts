/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";

declare module "express" {
  export interface Request {
    userId?: string;
    user?: Omit<User, "password">;
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
