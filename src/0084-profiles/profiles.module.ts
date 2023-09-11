import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { ProjectsModule } from 'src/0084-projects/projects.module';
import { Project } from 'src/0084-projects/projects.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [SequelizeModule.forFeature([Profile, Project]), ProjectsModule],
  exports: [],
})
export class ProfilesModule {}
