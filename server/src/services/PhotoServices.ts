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
  Photos,
  UserWithoutPassword,
} from "../@types/types";

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

  static async getAllPhotos(): Promise<Photos[]> {
    const photos = await photoRepository.find({ relations: ["authorID"] });

    return photos.map((photo) => {
      return {
        id: photo.id,
        authorID: photo.authorID.id,
        title: photo.title,
        date: photo.date,
        imageUrl: photo.imageUrl,
        total_comments: photo.total_comments,
        comments: photo.comments,
        meta: photo.meta,
      };
    });
  }

  static async getPhotoById(id: string): Promise<Photo> {
    if (!id) throw new BadRequestError("Invalid photo ID.");

    const parsedId = parseInt(id, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedId },
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    return photo;
  }
}
