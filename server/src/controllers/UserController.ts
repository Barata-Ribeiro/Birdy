import { Request, Response, NextFunction } from "express";
import dataSource from "../database/DataSource";
import * as bcrypt from "bcrypt";
import { User } from "../entities/User";

interface CreateUserRequestBody {
  username: string;
  password: string;
  email: string;
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, email } = req.body as CreateUserRequestBody;

  if (!username || !password || !email) {
    res.status(400).send("All fields are required.");
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;

    const userRepository = dataSource.getRepository(User);
    const savedUser = await userRepository.save(user);

    const returnUser = { ...savedUser, password: undefined };
    res.status(201).send(returnUser);
  } catch (error) {
    res.status(500).send("Error creating user.");
    next(error);
  }
};

// export const getUser = async (req: Request, res: Response) => {
//   // logic to get a user
// };
