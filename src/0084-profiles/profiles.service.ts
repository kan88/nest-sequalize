import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UpdateProfileDto } from './dto/update-profile.dto';

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
      returning: true,
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
