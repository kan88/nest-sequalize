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
    const project = await this.projectRepository.create(dto);
    return project;
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    return project;
  }

  async deleteProject(id: number, dto: DeleteProjectDatabaseDto) {
    const project = await this.projectRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return project;
  }

  async getProjectsById(profile_id: number) {
    const projects = await this.projectRepository.findAll({
      where: {
        profile_id,
        status: true,
      },
    });
    return projects;
  }
}
