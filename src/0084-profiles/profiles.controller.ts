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
import { UpdateVisibleDocumentsDto } from 'src/0084-documents/dto/update-visible-documents.dto';
import { Education } from 'src/0084-education/education.model';
import { CreateUpdateEducationDto } from 'src/0084-education/dto/create-update-education.dto';
import { EducationService } from 'src/0084-education/education.service';
import { UpdateVisibleEducationsDto } from 'src/0084-education/dto/update-visible-educations.dto';
import { WorksService } from 'src/0084-works/works.service';
import { Work } from 'src/0084-works/works.model';
import { CreateUpdateWorkDto } from 'src/0084-works/dto/create-update-work.dto';
import { UpdateVisibleWorksDto } from 'src/0084-works/dto/update-visible-works.dto';

@ApiTags('Профили пользователей')
@Controller('profile')
export class ProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private projectsService: ProjectsService,
    private documentsService: DocumentsService,
    private educationService: EducationService,
    private worksService: WorksService,
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

  @ApiOperation({ summary: 'Изменение видимости блока документов' })
  @ApiResponse({ status: 200, type: [Document] })
  @Patch(':samaccountname/documents/')
  async updateVisibleDocuments(@Body() dto: UpdateVisibleDocumentsDto) {
    const document = this.documentsService.updateVisible(dto);
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
    const document = await this.documentsService.deleteDocument(Number(id), {
      status: false,
    });
    return document;
  }

  @ApiOperation({ summary: 'Создание образования' })
  @ApiResponse({ status: 201, type: Education })
  @Post(':samaccountname/educations/')
  async createEducation(@Body() dto: CreateUpdateEducationDto) {
    const education = this.educationService.createEducation(dto);
    return education;
  }

  @ApiOperation({ summary: 'Изменение видимости блока образования' })
  @ApiResponse({ status: 200, type: [Education] })
  @Patch(':samaccountname/educations/')
  async updateVisibleEducations(@Body() dto: UpdateVisibleEducationsDto) {
    const education = this.educationService.updateVisible(dto);
    return education;
  }

  @ApiOperation({ summary: 'Изменение образования' })
  @ApiResponse({ status: 200, type: Education })
  @Patch(':samaccountname/educations/:id')
  async updateEducation(
    @Body() dto: CreateUpdateEducationDto,
    @Param('id') id: string,
  ) {
    const education = this.educationService.updateEducation(Number(id), dto);
    return education;
  }

  @ApiOperation({ summary: 'Удаление образования' })
  @ApiResponse({ status: 200, type: Education })
  @Delete(':samaccountname/educations/:id')
  async deleteEducation(@Param('id') id: string) {
    const education = await this.educationService.deleteEducation(Number(id), {
      status: false,
    });
    return education;
  }

  @ApiOperation({ summary: 'Создание работы' })
  @ApiResponse({ status: 201, type: Work })
  @Post(':samaccountname/works/')
  async createWork(@Body() dto: CreateUpdateWorkDto) {
    const work = this.worksService.createWork(dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение видимости блока работы' })
  @ApiResponse({ status: 200, type: [Work] })
  @Patch(':samaccountname/works/')
  async updateVisibleWorks(@Body() dto: UpdateVisibleWorksDto) {
    const work = this.worksService.updateVisible(dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение работы' })
  @ApiResponse({ status: 200, type: Work })
  @Patch(':samaccountname/works/:id')
  async updateWorks(@Body() dto: CreateUpdateWorkDto, @Param('id') id: string) {
    const work = this.worksService.updateWork(Number(id), dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление работы' })
  @ApiResponse({ status: 200, type: Work })
  @Delete(':samaccountname/works/:id')
  async deleteWork(@Param('id') id: string) {
    const work = await this.worksService.deleteWork(Number(id), {
      status: false,
    });
    return work;
  }
}
