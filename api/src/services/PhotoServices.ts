import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { validate } from "uuid";

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
  UserWithoutPassword,
} from "../@types/types";
import { PhotoResponseDTO } from "../dto/PhotoResponseDTO";

export class PhotoServices {
  static async uploadPhoto(
    user: UserWithoutPassword,
    file: Express.Multer.File,
    body: PhotoRequestBody
  ): Promise<Photo> {
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
    user: UserWithoutPassword,
    imageUrl: string,
    body: PhotoRequestBody
  ): Promise<Photo> {
    const photo = new Photo();
    photo.authorID = user.id;
    photo.authorName = user.username;
    photo.title = body.title;
    photo.imageUrl = imageUrl;
    photo.meta = {
      birdSize: body.size,
      birdHabitat: body.habitat,
    };

    await photoRepository.save(photo);

    return photo;
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
          folder: "birdy_uploads",
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

  static async getAllPhotos(): Promise<PhotoResponseDTO[]> {
    const photos = await photoRepository.find({
      relations: ["author", "comments"],
    });

    return photos.map((photo) => {
      const responseDTO = new PhotoResponseDTO();
      responseDTO.id = photo.id;
      responseDTO.authorID = photo.authorID;
      responseDTO.authorName = photo.authorName;
      responseDTO.title = photo.title;
      responseDTO.imageUrl = photo.imageUrl;
      responseDTO.meta = photo.meta;
      responseDTO.comments = photo.comments ?? [];
      responseDTO.createdAt = photo.createdAt;
      responseDTO.updatedAt = photo.updatedAt;
      return responseDTO;
    });
  }

  static async getPhotoById(photoId: string): Promise<PhotoResponseDTO> {
    if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

    const photo = await photoRepository.findOne({
      where: { id: photoId },
      relations: ["author", "comments"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    photo.meta.total_hits = (photo.meta.total_hits || 0) + 1;
    await photoRepository.save(photo);

    const responseDTO = new PhotoResponseDTO();
    responseDTO.id = photo.id;
    responseDTO.authorID = photo.authorID;
    responseDTO.authorName = photo.authorName;
    responseDTO.title = photo.title;
    responseDTO.imageUrl = photo.imageUrl;
    responseDTO.meta = photo.meta;
    responseDTO.comments = photo.comments ?? [];
    responseDTO.createdAt = photo.createdAt;
    responseDTO.updatedAt = photo.updatedAt;
    return responseDTO;
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
    photoId: string,
    user: UserWithoutPassword
  ): Promise<void> {
    const actualUser = await userRepository.findOne({
      where: { id: user.id },
    });

    if (!actualUser) throw new NotFoundError("User not found.");

    if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

    const photo = await photoRepository.findOne({
      where: { id: photoId },
      relations: ["authorID"],
    });

    if (!photo) throw new NotFoundError("Photo not found.");

    if (photo.authorID !== actualUser.id)
      throw new BadRequestError("You are not the author of this photo.");

    const parts = photo.imageUrl.split("/");
    const fileName = parts.pop();
    const folderName = parts.pop();
    const publicId =
      folderName && fileName
        ? `${folderName}/${fileName.split(".")[0]}`
        : undefined;

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
