import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

import { User } from "../entities/User";
import { Photo } from "../entities/Photo";
import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../helpers/api-errors";
import {
  CloudinaryCallbackResult,
  CloudinaryResult,
  PhotoRequestBody,
  PhotoResponse,
  Photos,
  UserWithoutPassword,
} from "../@types/types";

export class PhotoServices {
  static async uploadPhoto(
    user: UserWithoutPassword,
    file: Express.Multer.File,
    body: PhotoRequestBody
  ): Promise<PhotoResponse> {
    const actualUser = await this.verifyUser(user.id);
    this.validateFile(file);

    const secure_url = await this.uploadPhotoToCloudinary(file);
    return await this.savePhotoToDB(actualUser, secure_url, body);
  }

  private static async verifyUser(userId: string): Promise<User> {
    const actualUser = await userRepository.findOne({ where: { id: userId } });
    if (!actualUser) throw new NotFoundError("User not found.");
    return actualUser;
  }

  private static validateFile(file: Express.Multer.File): void {
    if (!file.mimetype.includes("image"))
      throw new BadRequestError("Invalid file type.");
  }

  private static async savePhotoToDB(
    user: User,
    imageUrl: string,
    body: PhotoRequestBody
  ): Promise<PhotoResponse> {
    const photo = new Photo();
    photo.imageUrl = imageUrl;
    photo.authorID = user;
    photo.title = body.title;
    photo.meta = { size: body.size, habitat: body.habitat, access: 0 };
    await photoRepository.save(photo);
    return {
      id: photo.id,
      url: imageUrl,
      title: body.title,
      authorID: user.id,
      size: body.size,
      habitat: body.habitat,
    };
  }

  private static cloudinaryConfiguration(): void {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  private static async uploadPhotoToCloudinary(
    file: Express.Multer.File
  ): Promise<string> {
    PhotoServices.cloudinaryConfiguration();
    const result = await this.streamUpload(file);
    return result.secure_url;
  }

  private static async streamUpload(
    file: Express.Multer.File
  ): Promise<CloudinaryResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          asset_folder: "Birdy_Assets",
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

  static async getPhotoById(id: string): Promise<Photos> {
    if (!id) throw new BadRequestError("Invalid photo ID.");

    const parsedId = parseInt(id, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedId },
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    photo.meta.access = (photo.meta.access || 0) + 1;
    await photoRepository.save(photo);

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
  }

  private static deletePhotoFromCloudinary(publicId: string): Promise<void> {
    PhotoServices.cloudinaryConfiguration();
    return new Promise((resolve, reject) => {
      void cloudinary.uploader.destroy(
        publicId,
        (error: unknown, result?: CloudinaryCallbackResult) => {
          if (result) resolve();
          else reject(error);
        }
      );
    });
  }

  static async deletePhoto(
    id: string,
    user: UserWithoutPassword
  ): Promise<void> {
    const actualUser = (await userRepository.findOne({
      where: { id: user.id },
    })) as User;

    if (!actualUser) throw new NotFoundError("User not found.");

    if (!id) throw new BadRequestError("Invalid photo ID.");

    const parsedId = parseInt(id, 10);

    const photo = await photoRepository.findOne({
      where: { id: parsedId },
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    if (photo.authorID.id !== actualUser.id)
      throw new BadRequestError("You are not the author of this photo.");

    const parts = photo.imageUrl.split("/");
    const fileName = parts.pop();
    const publicId = fileName ? fileName.split(".")[0] : undefined;

    if (!publicId) throw new Error("Failed to extract the publicId.");

    try {
      await this.deletePhotoFromCloudinary(publicId);
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      throw new InternalServerError(
        "Failed to delete the image from Cloudinary."
      );
    }

    await photoRepository.remove(photo);
  }
}
