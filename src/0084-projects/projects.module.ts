import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { ProjectsService } from './projects.service';

@Module({
  providers: [ProjectsService],
  imports: [SequelizeModule.forFeature([Project])],
  exports: [ProjectsService],
})
export class ProjectsModule {}
