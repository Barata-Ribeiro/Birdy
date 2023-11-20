import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { EntityManager } from "typeorm";
import { validate } from "uuid";

import {
	CloudinaryCallbackResult,
	CloudinaryResult,
	PhotoRequestBody,
	UserWithoutPassword,
} from "../@types/types";
import { ALL_PHOTOS_CACHE_KEY, userPhotosCacheKey } from "../constants";
import dataSource from "../database/DataSource";
import { PhotoQueryResponseDTO } from "../dto/PhotoQueryResponseDTO";
import { PhotoResponseDTO } from "../dto/PhotoResponseDTO";
import { Photo } from "../entities/Photo";
import { User } from "../entities/User";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "../helpers/api-errors";
import { photoRepository } from "../repositories/photoRepository";
import { userRepository } from "../repositories/userRepository";

export class PhotoServices {
	static async uploadPhoto(
		user: UserWithoutPassword,
		file: Express.Multer.File,
		body: PhotoRequestBody
	): Promise<Photo> {
		const actualUser = await this.verifyUser(user.id);
		this.validateFile(file);

		const secure_url = await this.uploadPhotoToCloudinary(file);
		const newPhoto = await this.savePhotoToDB(actualUser, secure_url, body);

		await dataSource.queryResultCache?.remove([ALL_PHOTOS_CACHE_KEY]);
		const userCacheKey = userPhotosCacheKey(user.id);
		await dataSource.queryResultCache?.remove([userCacheKey]);

		return newPhoto;
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
			streamifier.createReadStream(file.buffer).pipe(stream);
		});
	}

	static async getAllPhotos(
		page: number,
		limit: number,
		userId?: string
	): Promise<PhotoQueryResponseDTO[]> {
		if (page < 1 || limit < 1)
			throw new BadRequestError("Page and limit must be positive integers.");

		const cacheKey = userId ? userPhotosCacheKey(userId) : ALL_PHOTOS_CACHE_KEY;
		const [photos, totalPhotos] = await photoRepository
			.createQueryBuilder("photo")
			.leftJoinAndSelect("photo.author", "author")
			.leftJoinAndSelect("photo.likes", "likes")
			.leftJoinAndSelect("photo.comments", "comments")
			.where(userId ? "photo.authorID = :userId" : "1=1", { userId })
			.take(limit)
			.skip((page - 1) * limit)
			.cache(cacheKey, 60000)
			.getManyAndCount();

		if ((page - 1) * limit >= totalPhotos && page !== 1) return [];

		return photos.map((photo) => PhotoQueryResponseDTO.fromEntity(photo));
	}

	static async getPhotoById(
		photoId: string,
		hasViewed: boolean
	): Promise<PhotoResponseDTO> {
		if (!validate(photoId)) throw new BadRequestError("Invalid photo ID.");

		const photo = await photoRepository.findOne({
			where: { id: photoId },
			relations: [
				"author",
				"comments",
				"comments.photo",
				"likes",
				"likes.photo",
			],
		});

		if (!photo) throw new NotFoundError("Photo not found.");

		if (!hasViewed) {
			photo.meta.total_hits = (photo.meta.total_hits || 0) + 1;
			await photoRepository.save(photo);
		}

		return PhotoResponseDTO.fromEntity(photo);
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

	public static deletePhotoForAdmin = (publicId: string): Promise<void> =>
		this.deletePhotoFromCloudinary(publicId);

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
			relations: ["author"],
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

	static async deleteAllPhotos(
		transactionalEntityManager: EntityManager,
		userId: string
	): Promise<void> {
		const photos = await transactionalEntityManager.find(Photo, {
			where: { authorID: userId },
			relations: ["author", "likes", "comments"],
		});

		if (!photos || photos.length === 0) return;

		const publicIds = photos
			.map((photo) => {
				const parts = photo.imageUrl.split("/");
				const fileName = parts.pop();
				const folderName = parts.pop();
				return folderName && fileName
					? `${folderName}/${fileName.split(".")[0]}`
					: null;
			})
			.filter((id): id is string => id !== null);

		try {
			PhotoServices.cloudinaryConfiguration();
			for (let i = 0; i < publicIds.length; i += 100) {
				const batch = publicIds.slice(i, i + 100);
				await cloudinary.api.delete_resources(batch);
			}
		} catch (error) {
			console.error("Error deleting from Cloudinary:", error);
			throw new InternalServerError("Failed to delete images from Cloudinary.");
		}

		await transactionalEntityManager.remove(photos);
	}
}
