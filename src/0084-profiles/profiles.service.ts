import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Document } from 'src/0084-documents/documents.model';
import { Education } from 'src/0084-education/education.model';
import { Project } from 'src/0084-projects/projects.model';
import { Work } from 'src/0084-works/works.model';
import { Achievement } from 'src/0084-achievements/achievements.model';
import { Transport } from 'src/0084-transports/transports.model';
import { Avatar } from 'src/0084-avatars/avatars.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { DocumentsService } from 'src/0084-documents/documents.service';
import { EducationService } from 'src/0084-education/education.service';
import { WorksService } from 'src/0084-works/works.service';
import { AchievementsService } from 'src/0084-achievements/achievements.service';
import { TransportsService } from 'src/0084-transports/transports.service';
import { AvatarsService } from 'src/0084-avatars/avatars.service';

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
    profile[0].achievements = [...achievements];
    const educations = await this.educationService.getEducationsById(id);
    profile[0].educations = [...educations];
    const documents = await this.documentsService.getDocumentsById(id);
    profile[0].documents = [...documents];
    const avatars = await this.avatarService.getAvatarsById(id);
    profile[0].avatars = [...avatars];
    const projects = await this.projectsService.getProjectsById(id);
    profile[0].projects = [...projects];
    const transports = await this.transportService.getTransportsById(id);
    profile[0].transports = [...transports];
    const works = await this.worksService.getWorksById(id);
    profile[0].works = [...works];
    console.log(profile);
    console.log(process);
    return profile;
  }
}
