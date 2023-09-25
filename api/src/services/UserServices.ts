import * as bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
import { validate } from "uuid";

import { User } from "../entities/User";
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

    const isEmailValid = (email: string): boolean => {
      const regex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
      return regex.test(email);
    };

    if (!isEmailValid(email))
      throw new BadRequestError("Invalid email format.");

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

    return UserService.createResponseUser(newUser);
  }

  static async getUserById(id: string): Promise<UserWithoutPassword> {
    if (!validate(id)) throw new BadRequestError("Invalid user ID format.");

    const user = await userRepository.findOne({
      where: { id: id },
      relations: ["photos", "comments", "likes"],
    });

    if (!user) throw new NotFoundError("User not found");

    return UserService.createResponseUser(user);
  }

  static async getAllUsers(): Promise<UserWithoutPassword[]> {
    const users = await userRepository.find({
      relations: ["photos", "comments", "likes"],
    });

    return users.map(UserService.createResponseUser);
  }

  private static createResponseUser = (user: User): UserWithoutPassword => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      comments: user.comments,
      photos: user.photos,
      likes: user.likes,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}

export default UserService;
