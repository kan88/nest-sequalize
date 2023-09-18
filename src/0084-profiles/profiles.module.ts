import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { ProjectsModule } from 'src/0084-projects/projects.module';
import { Project } from 'src/0084-projects/projects.model';
import { DocumentsModule } from 'src/0084-documents/documents.module';
import { Document } from 'src/0084-documents/documents.model';
import { Education } from 'src/0084-education/education.model';
import { EducationModule } from 'src/0084-education/education.module';
import { Work } from 'src/0084-works/works.model';
import { WorksModule } from 'src/0084-works/works.module';
import { Achievement } from 'src/0084-achievements/achievements.model';
import { AchievementModule } from 'src/0084-achievements/achievements.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [
    SequelizeModule.forFeature([
      Profile,
      Project,
      Document,
      Education,
      Work,
      Achievement,
    ]),
    ProjectsModule,
    DocumentsModule,
    EducationModule,
    WorksModule,
    AchievementModule,
  ],
  exports: [],
})
export class ProfilesModule {}
