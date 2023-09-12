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
      models: [Profile, Role, Project, Document],
      autoLoadModels: true,
      synchronize: true,
    }),
    ProfilesModule,
    RolesModule,
    ProjectsModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
