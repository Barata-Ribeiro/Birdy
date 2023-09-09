import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
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
      return res.status(400).send("All fields are required.");
    }

    const existingUserByEmail = await userRepository.findOneBy({ email });
    const existingUserByUsername = await userRepository.findOneBy({ username });

    if (existingUserByEmail || existingUserByUsername) {
      return res.status(409).send("Username or Email already exists.");
    }

    const isPasswordStrong = (password: string): boolean => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    if (!isPasswordStrong(password)) {
      return res.status(400).send("Password does not meet the criteria.");
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
      return res.status(201).send(repsonseUser);
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        return res.status(409).send("Duplicate field value entered");
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

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
}
