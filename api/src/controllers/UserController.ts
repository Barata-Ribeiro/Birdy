import { Request, Response } from "express";

import { CreateUserRequestBody } from "../@types/types";
import UserService from "../services/UserServices";

export class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    const userData = req.body as CreateUserRequestBody;
    const newUser = await UserService.createUser(userData);
    return res.status(201).json(newUser);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const user = await UserService.getUserById(id);
    return res.status(200).json(user);
  }

  async getAllUsers(_req: Request, res: Response): Promise<Response> {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  }
}