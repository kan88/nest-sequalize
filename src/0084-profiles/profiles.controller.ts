import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { CreateProjectDto } from '../0084-projects/dto/create-project.dto';
import { Project } from 'src/0084-projects/projects.model';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Patch(':samaccountname')
  async updateProfileBySamaccountname(
    @Param('samaccountname') samaccountname: string,
    @Body() dto: UpdateProfileDto,
  ) {
    const profile = await this.profilesService.updateProfileBySamaccountname(
      dto,
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
