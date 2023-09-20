import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import { DeleteProjectDatabaseDto } from './dto/delete-project-database.dto';
import { CreateProjectDatabaseDto } from './dto/create-project-database.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) {}
  async createProject(dto: CreateProjectDatabaseDto) {
    const profile = await this.projectRepository.create(dto);
    return profile;
  }

  async deleteProject(id: number, dto: DeleteProjectDatabaseDto) {
    const profile = await this.projectRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return profile;
  }
}
