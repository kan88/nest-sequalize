import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profiles.model';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
  ) {}
  async createProfile(dto: CreateProfileDto) {
    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  async getAllProfiles() {
    const profiles = await this.profileRepository.findAll({
      include: { all: true },
    });
    return profiles;
  }

  async getProfileOrCreateBySamaccountname(samaccountname: string) {
    const profile = await this.profileRepository.findOrCreate({
      where: { samaccountname: samaccountname },
    });
    return profile;
  }
}
