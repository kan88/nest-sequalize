import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profiles.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
  ) {}

  async updateProfileBySamaccountname(
    dto: UpdateProfileDto,
    samaccountname: string,
  ) {
    const profiles = await this.profileRepository.update(dto, {
      where: {
        samaccountname,
      },
    });
    return profiles;
  }

  async getProfileOrCreateBySamaccountname(samaccountname: string) {
    const profile = await this.profileRepository.findOrCreate({
      where: { samaccountname: samaccountname },
      include: { all: true },
    });
    return profile;
  }
}
