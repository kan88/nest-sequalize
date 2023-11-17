import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { Project } from './0084-projects/projects.model';
import { Education } from './0084-education/education.model';
import { Work } from './0084-works/works.model';
import { Achievement } from './0084-achievements/achievements.model';
import { Transport as Transports } from './0084-transports/transports.model';
import { Avatar } from './0084-avatars/avatars.model';
import { ProjectsModule } from './0084-projects/projects.module';
import { DocumentsModule } from './0084-documents/documents.module';
import { EducationModule } from './0084-education/education.module';
import { WorksModule } from './0084-works/works.module';
import { AchievementsModule } from './0084-achievements/achievements.module';
import { TransportsModule } from './0084-transports/transports.module';
import { AvatarsModule } from './0084-avatars/avatars.module';
import { Document } from './0084-documents/documents.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
    SequelizeModule.forFeature([
      Profile,
      Project,
      Document,
      Education,
      Work,
      Achievement,
      Transports,
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
