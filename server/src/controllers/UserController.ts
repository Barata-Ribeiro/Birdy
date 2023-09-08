import { Request, Response } from "express";
import { DataSource } from "typeorm/data-source/DataSource";
import * as bcrypt from "bcrypt";
import { User } from "src/entities/User";
import ormconfig from "src/database/ormconfig";

interface CreateUserRequestBody {
  username: string;
  password: string;
  email: string;
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password, email } = req.body as CreateUserRequestBody;
  const dataBase = new DataSource(ormconfig);

  if (!username || !password || !email) {
    return res.status(400).send("All fields are required.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;

    const userRepository = dataBase.getRepository(User);
    const savedUser = await userRepository.save(user);

    const returnUser = { ...savedUser, password: undefined };
    return res.status(201).send(returnUser);
  } catch (error) {
    return res.status(500).send("Error creating user.");
  }
};

// export const getUser = async (req: Request, res: Response) => {
//   // logic to get a user
// };
