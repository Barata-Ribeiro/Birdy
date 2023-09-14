import { NextFunction, Request, Response } from "express";

import { PhotoServices } from "../services/PhotoServices";
import { UnauthorizedError, BadRequestError } from "../helpers/api-errors";
import { UserWithoutPassword, PhotoRequestBody } from "../@types/birdy";

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

      if (!user) throw new UnauthorizedError("User not authenticated.");
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ): Promise<Response> {
    const photos = await PhotoServices.getAllPhotos();
    return res.status(200).send(photos);
  }
}
