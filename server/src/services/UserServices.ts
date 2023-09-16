import { Request } from "express";
import * as bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
import { validate } from "uuid";

import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../helpers/api-errors";
import { CreateUserRequestBody, UserWithoutPassword } from "../@types/types";

class UserService {
  static async createUser(
    data: CreateUserRequestBody
  ): Promise<UserWithoutPassword> {
    const { username, password, email } = data;

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

    const responseUser: UserWithoutPassword = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      comments: newUser.comments,
      photos: newUser.photos,
    };

    return responseUser;
  }

  static async getUserById(req: Request): Promise<UserWithoutPassword> {
    const { id } = req.params as { id: string };

    if (!validate(id)) throw new BadRequestError("Invalid user ID format.");

    const user = await userRepository.findOne({
      where: { id: id },
      relations: ["photos", "comments"],
    });

    if (!user) throw new NotFoundError("User not found");

    const responseUser: UserWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      comments: user.comments,
      photos: user.photos,
    };

    return responseUser;
  }

  static async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await userRepository.find({
      relations: ["photos", "comments"],
    });

    const responseUsers: UserWithoutPassword[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      comments: user.comments,
      photos: user.photos,
    }));

    return responseUsers;
  }
}

export default UserService;
