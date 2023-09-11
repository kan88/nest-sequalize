import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { DeleteProjectDto } from './dto/delete-project.dto';
import { Project } from 'src/0084-projects/projects.model';

@ApiTags('Профили пользователей')
@Controller('profile')
export class ProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private projectsService: ProjectsService,
  ) {}

  @ApiOperation({ summary: 'Получение или создание пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Get(':samaccountname')
  async getProfileOrCreateBySamaccountname(
    @Param('samaccountname') samaccountname: string,
  ) {
    const profile =
      await this.profilesService.getProfileOrCreateBySamaccountname(
        samaccountname,
      );
    return profile;
  }

  @ApiOperation({ summary: 'создание проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Post(':samaccountname/projects/')
  async createProject(
    @Param('samaccountname') samaccountname: string,
    @Body() dto: CreateProjectDto,
  ) {
    const project = this.projectsService.createProject(dto);
    return project;
  }

  @ApiOperation({ summary: 'удаление проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Delete(':samaccountname/projects/:id')
  async deleteProject(
    @Param('samaccountname') samaccountname: string,
    @Param('id') id: string,
  ) {
    const project = await this.projectsService.deleteProject(Number(id), {
      status: false,
    });
    return project;
  }
}
