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
import { DocumentsService } from 'src/0084-documents/documents.service';
import { CreateUpdateDocumentDto } from 'src/0084-documents/dto/create-update-document.dto';
import { Document } from 'src/0084-documents/documents.model';

@ApiTags('Профили пользователей')
@Controller('profile')
export class ProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private projectsService: ProjectsService,
    private documentsService: DocumentsService,
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

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 201, type: Project })
  @Post(':samaccountname/projects/')
  async createProject(@Body() dto: CreateProjectDto) {
    const project = this.projectsService.createProject(dto);
    return project;
  }

  @ApiOperation({ summary: 'Удаление проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Delete(':samaccountname/projects/:id')
  async deleteProject(@Param('id') id: string) {
    const project = await this.projectsService.deleteProject(Number(id), {
      status: false,
    });
    return project;
  }

  @ApiOperation({ summary: 'Создание документа' })
  @ApiResponse({ status: 201, type: Document })
  @Post(':samaccountname/documents/')
  async createDocument(@Body() dto: CreateUpdateDocumentDto) {
    const document = this.documentsService.createDocument(dto);
    return document;
  }

  @ApiOperation({ summary: 'Изменение документа' })
  @ApiResponse({ status: 200, type: Document })
  @Patch(':samaccountname/documents/:id')
  async updateDocument(
    @Body() dto: CreateUpdateDocumentDto,
    @Param('id') id: string,
  ) {
    const document = this.documentsService.updateDocument(Number(id), dto);
    return document;
  }

  @ApiOperation({ summary: 'Удаление документа' })
  @ApiResponse({ status: 200, type: Document })
  @Delete(':samaccountname/documents/:id')
  async deleteDocument(@Param('id') id: string) {
    const project = await this.documentsService.deleteDocument(Number(id), {
      status: false,
    });
    return project;
  }
}
