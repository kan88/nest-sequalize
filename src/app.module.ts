import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './0084-profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './0000-roles/administrator.module';
import { Role } from './0000-roles/administrator.model';
import { Profile } from './0084-profiles/profiles.model';
import { Project } from './0084-projects/projects.model';
import { ProjectsModule } from './0084-projects/projects.module';
import { DocumentsModule } from './0084-documents/documents.module';
import { Document } from './0084-documents/documents.model';
import { Education } from './0084-education/education.model';
import { EducationModule } from './0084-education/education.module';
import { WorksModule } from './0084-works/works.module';
import { Work } from './0084-works/works.model';
import { Achievement } from './0084-achievements/achievements.model';
import { AchievementModule } from './0084-achievements/achievements.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Profile, Role, Project, Document, Education, Work, Achievement],
      autoLoadModels: true,
      synchronize: true,
    }),
    ProfilesModule,
    RolesModule,
    ProjectsModule,
    DocumentsModule,
    EducationModule,
    WorksModule,
    AchievementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
