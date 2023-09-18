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
import { AchievementsModule } from 'src/0084-achievements/achievements.module';
import { TransportsModule } from 'src/0084-transports/transports.module';
import { Transport } from 'src/0084-transports/transports.model';
import { Avatar } from 'src/0084-avatars/avatars.model';
import { AvatarsModule } from 'src/0084-avatars/avatars.module';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';

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
      Transport,
      Avatar,
    ]),
    ProjectsModule,
    DocumentsModule,
    EducationModule,
    WorksModule,
    AchievementsModule,
    TransportsModule,
    AvatarsModule,
  ],
  exports: [],
})
export class ProfilesModule {}
