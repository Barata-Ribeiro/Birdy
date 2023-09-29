import { ProfileResponseDTO } from "../dto/ProfileResponseDTO";

import { userRepository } from "../repositories/userRepository";

import { NotFoundError } from "../helpers/api-errors";

export class ProfileServices {
  static async getProfile(userId: string): Promise<ProfileResponseDTO> {
    const actualUser = await userRepository.findOne({
      where: { id: userId },
      relations: ["photos", "photos.meta"],
    });
    if (!actualUser) throw new NotFoundError("User not found.");

    return ProfileResponseDTO.fromEntity(actualUser);
  }
}
