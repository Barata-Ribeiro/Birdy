/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

export interface CreateUserRequestBody {
  username: string;
  password: string;
  email: string;
}
