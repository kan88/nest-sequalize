import { Injectable } from '@nestjs/common';
import { Profile } from './profiles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';

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

  async getIdByProfile(samaccountname: string) {
    const { id } = await this.profileRepository.findOne({
      where: { samaccountname: samaccountname },
    });
    return id;
  }
}
