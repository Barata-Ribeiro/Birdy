import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

import { User } from "../entities/User";
import { Photo } from "../entities/Photo";
import { photoRepository } from "../repositories/photoRepositoty";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import {
  CloudinaryResult,
  PhotoRequestBody,
  PhotoResponse,
  UserWithoutPassword,
} from "../@types/birdy";

export class PhotoServices {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadPhoto(
    user: UserWithoutPassword,
    file: Express.Multer.File,
    body: PhotoRequestBody
  ): Promise<{
    url: string;
    title: string;
    authorID: string;
    size: number;
    habitat: string;
  }> {
    const actualUser = (await userRepository.findOne({
      where: { id: user.id },
    })) as User;

    if (!actualUser) throw new NotFoundError("User not found.");

    if (!file.mimetype.includes("image"))
      throw new BadRequestError("Invalid file type.");

    const secure_url = await this.uploadPhotoToCloudinary(file);

    const photo = new Photo();
    photo.imageUrl = secure_url;
    photo.authorID = actualUser;
    photo.title = body.title;
    photo.meta = {
      size: body.size,
      habitat: body.habitat,
      access: 0,
    };

    await photoRepository.save(photo);

    const responsePhoto: PhotoResponse = {
      id: photo.id,
      url: secure_url,
      title: body.title,
      authorID: user.id,
      size: body.size,
      habitat: body.habitat,
    };

    return responsePhoto;
  }

  private async uploadPhotoToCloudinary(
    file: Express.Multer.File
  ): Promise<string> {
    const result = await this.streamUpload(file);
    return result.secure_url;
  }

  private async streamUpload(
    file: Express.Multer.File
  ): Promise<CloudinaryResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          format: "jpg",
          transformation: [{ width: 1000, height: 1000, crop: "limit" }],
          allowed_formats: ["jpg", "png"],
        },
        (error: unknown, result?: CloudinaryResult) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  static async getAllPhotos(): Promise<Photo[]> {
    const photos = await photoRepository.find();

    return photos;
  }
}
