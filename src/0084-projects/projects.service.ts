import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.model';
import { DeleteProjectDto } from './dto/delete-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
  ) {}
  async createProject(dto: CreateProjectDto) {
    const profile = await this.projectRepository.create(dto);
    return profile;
  }

  async deleteProject(id: number, dto: DeleteProjectDto) {
    const profile = await this.projectRepository.update(dto, {
      where: {
        id,
      },
    });
    return profile;
  }
}
