import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
import { validate } from "uuid";

import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "src/helpers/api-errors";
import { CreateUserRequestBody } from "../@types/birdy";

export class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    const { username, password, email } = req.body as CreateUserRequestBody;

    if (!username || !password || !email)
      throw new BadRequestError("All fields are required.");

    const existingUserByEmail = await userRepository.findOneBy({ email });
    const existingUserByUsername = await userRepository.findOneBy({ username });

    if (existingUserByEmail || existingUserByUsername)
      throw new ConflictError("User already exists.");

    const isPasswordStrong = (password: string): boolean => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    if (!isPasswordStrong(password))
      throw new BadRequestError("Password is too weak.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await userRepository.save(newUser);
    } catch (error) {
      console.error(error);

      if (error instanceof QueryFailedError)
        throw new ConflictError("Duplicate field value entered.");

      throw new InternalServerError("Internal server error");
    }

    const responseUser = { ...newUser, password: undefined };
    return res.status(201).json(responseUser);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!validate(id)) throw new BadRequestError("Invalid user ID format.");

    const user = await userRepository.findOneBy({ id });

    if (!user) throw new NotFoundError("User not found");

    const responseUser = { ...user, password: undefined };
    return res.status(200).json(responseUser);
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    const users = await userRepository.find();

    const responseUsers = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        comments: user.comments,
        photos: user.photos,
      };
    });

    return res.status(200).json(responseUsers);
  }
}
