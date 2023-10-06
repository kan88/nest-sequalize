import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { where } from 'sequelize';
import { Document } from 'src/0084-documents/documents.model';
import { Education } from 'src/0084-education/education.model';
import { Project } from 'src/0084-projects/projects.model';
import { Work } from 'src/0084-works/works.model';
import { Achievement } from 'src/0084-achievements/achievements.model';
import { Transport } from 'src/0084-transports/transports.model';
import { Avatar } from 'src/0084-avatars/avatars.model';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
  ) {}

  async updateProfileById(dto: UpdateProfileDto, id: number) {
    const profiles = await this.profileRepository.update(dto, {
      where: {
        id: id,
      },
      returning: true,
    });
    return profiles;
  }

  async getProfileOrCreateBySamaccountname(samaccountname: string) {
    const profile = await this.profileRepository.findOrCreate({
      where: { samaccountname: samaccountname },
      include: [
        {
          model: Document,
          as: 'documents',
          where: { status: true },
          required: false,
        },
        {
          model: Education,
          as: 'educations',
          where: { status: true },
          required: false,
        },
        {
          model: Project,
          as: 'projects',
          where: { status: true },
          required: false,
        },
        {
          model: Work,
          as: 'works',
          where: { status: true },
          required: false,
        },
        {
          model: Achievement,
          as: 'achievements',
          where: { status: true },
          required: false,
        },
        {
          model: Transport,
          as: 'transports',
          where: { status: true },
          required: false,
        },
        {
          model: Avatar,
          as: 'avatars',

          where: { status: true },
          required: false,
        },
      ],
    });
    return profile;
  }
}
