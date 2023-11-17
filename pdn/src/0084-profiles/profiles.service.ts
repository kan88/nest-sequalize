import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProjectsService } from './0084-projects/projects.service';
import { DocumentsService } from './0084-documents/documents.service';
import { EducationService } from './0084-education/education.service';
import { WorksService } from './0084-works/works.service';
import { AchievementsService } from './0084-achievements/achievements.service';
import { TransportsService } from './0084-transports/transports.service';
import { AvatarsService } from './0084-avatars/avatars.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile,
    private projectsService: ProjectsService,
    private documentsService: DocumentsService,
    private educationService: EducationService,
    private worksService: WorksService,
    private achievementService: AchievementsService,
    private transportService: TransportsService,
    private avatarService: AvatarsService,
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
      where: { samaccountname },
    });
    const id = profile[0].id;
    const achievements = await this.achievementService.getAcheivementsById(id);
    profile[0].dataValues.achievements = [...achievements];
    const educations = await this.educationService.getEducationsById(id);
    profile[0].dataValues.educations = [...educations];
    const documents = await this.documentsService.getDocumentsById(id);
    profile[0].dataValues.documents = [...documents];
    const avatars = await this.avatarService.getAvatarsById(id);
    profile[0].dataValues.avatars = [...avatars];
    const projects = await this.projectsService.getProjectsById(id);
    profile[0].dataValues.projects = [...projects];
    const transports = await this.transportService.getTransportsById(id);
    profile[0].dataValues.transports = [...transports];
    const works = await this.worksService.getWorksById(id);
    profile[0].dataValues.works = [...works];
    return profile;
  }
}
