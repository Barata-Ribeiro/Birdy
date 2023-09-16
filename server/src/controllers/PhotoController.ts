/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { PhotoServices } from "../services/PhotoServices";
import { BadRequestError } from "../helpers/api-errors";
import { PhotoRequestBody, UserWithoutPassword } from "../@types/types";

export class PhotoController {
  private photoServices: PhotoServices;

  constructor() {
    this.photoServices = new PhotoServices();
  }

  async uploadPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = req.user as UserWithoutPassword;
      const file = req.file as Express.Multer.File;

      if (!file) throw new BadRequestError("No file provided.");

      const { title, size, habitat } = req.body as PhotoRequestBody;
      if (!title || !size || !habitat)
        throw new BadRequestError(
          "Title, size, and habitat are required fields."
        );

      const body: PhotoRequestBody = {
        title,
        size,
        habitat,
      };

      const result = await this.photoServices.uploadPhoto(user, file, body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllPhotos(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const photos = await PhotoServices.getAllPhotos();
    return res.status(200).send(photos);
  }

  async getPhotoById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const photo = await PhotoServices.getPhotoById(id);
    return res.status(200).json(photo);
  }

  async deletePhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params as { id: string };
      const user = req.user as UserWithoutPassword;

      await PhotoServices.deletePhoto(id, user);
      return res.status(200).send({ message: "Photo deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}
