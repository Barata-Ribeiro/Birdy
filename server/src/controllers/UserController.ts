import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
import { validate } from "uuid";
import { userRepository } from "../repositories/userRepository";

interface CreateUserRequestBody {
  username: string;
  password: string;
  email: string;
}

export class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    const { username, password, email } = req.body as CreateUserRequestBody;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUserByEmail = await userRepository.findOneBy({ email });
    const existingUserByUsername = await userRepository.findOneBy({ username });

    if (existingUserByEmail || existingUserByUsername) {
      return res
        .status(409)
        .json({ message: "Username or Email already exists." });
    }

    const isPasswordStrong = (password: string): boolean => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    if (!isPasswordStrong(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet the criteria." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      const repsonseUser = { ...newUser, password: undefined };
      return res.status(201).json(repsonseUser);
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        return res
          .status(409)
          .json({ message: "Duplicate field value entered" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    try {
      const user = await userRepository.findOneBy({ id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const responseUser = { ...user, password: undefined };
      return res.status(200).json(responseUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    try {
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
