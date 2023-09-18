import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profiles.model';
import { ProjectsService } from 'src/0084-projects/projects.service';
import { CreateProjectDto } from '../0084-projects/dto/create-project.dto';
import { Project } from 'src/0084-projects/projects.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DocumentsService } from 'src/0084-documents/documents.service';
import { CreateDocumentDto } from 'src/0084-documents/dto/create-document.dto';
import { Document } from 'src/0084-documents/documents.model';
import { UpdateVisibleDocumentsDto } from 'src/0084-documents/dto/update-visible-documents.dto';
import { Education } from 'src/0084-education/education.model';
import { CreateEducationDto } from 'src/0084-education/dto/create-education.dto';
import { EducationService } from 'src/0084-education/education.service';
import { UpdateVisibleEducationsDto } from 'src/0084-education/dto/update-visible-educations.dto';
import { WorksService } from 'src/0084-works/works.service';
import { Work } from 'src/0084-works/works.model';
import { CreateWorkDto } from 'src/0084-works/dto/create-work.dto';
import { UpdateVisibleWorksDto } from 'src/0084-works/dto/update-visible-works.dto';
import { UpdateDocumentDto } from 'src/0084-documents/dto/update-document.dto';
import { UpdateEducationDto } from 'src/0084-education/dto/update-education.dto';
import { UpdateWorkDto } from 'src/0084-works/dto/update-work.dto';
import { AchievementsService } from 'src/0084-achievements/achievements.service';
import { CreateAchievementDto } from 'src/0084-achievements/dto/create-achievement.dto';
import { UpdateVisibleAchievementsDto } from 'src/0084-achievements/dto/update-visible-achievements.dto';
import { UpdateAchievementDto } from 'src/0084-achievements/dto/update-achievement.dto';
import { Achievement } from 'src/0084-achievements/achievements.model';
import { TransportsService } from 'src/0084-transports/transports.service';
import { Transport } from 'src/0084-transports/transports.model';
import { UpdateVisibleTransportsDto } from 'src/0084-transports/dto/update-visible-transports.dto';
import { CreateTransportDto } from 'src/0084-transports/dto/create-transport.dto';
import { UpdateTransportDto } from 'src/0084-transports/dto/update-transport.dto';

@ApiTags('Профили пользователей')
@Controller('profile')
export class ProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private projectsService: ProjectsService,
    private documentsService: DocumentsService,
    private educationService: EducationService,
    private worksService: WorksService,
    private achievementService: AchievementsService,
    private transportService: TransportsService,
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
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.deleteProject(id, {
      status: false,
    });
    return project;
  }

  @ApiOperation({ summary: 'Создание документа' })
  @ApiResponse({ status: 201, type: Document })
  @Post(':samaccountname/documents/')
  async createDocument(@Body() dto: CreateDocumentDto) {
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
    @Body() dto: UpdateDocumentDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const document = this.documentsService.updateDocument(id, dto);
    return document;
  }

  @ApiOperation({ summary: 'Удаление документа' })
  @ApiResponse({ status: 200, type: Document })
  @Delete(':samaccountname/documents/:id')
  async deleteDocument(@Param('id', ParseIntPipe) id: number) {
    const document = await this.documentsService.deleteDocument(id, {
      status: false,
    });
    return document;
  }

  @ApiOperation({ summary: 'Создание образования' })
  @ApiResponse({ status: 201, type: Education })
  @Post(':samaccountname/educations/')
  async createEducation(@Body() dto: CreateEducationDto) {
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
    @Body() dto: UpdateEducationDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const education = this.educationService.updateEducation(id, dto);
    return education;
  }

  @ApiOperation({ summary: 'Удаление образования' })
  @ApiResponse({ status: 200, type: Education })
  @Delete(':samaccountname/educations/:id')
  async deleteEducation(@Param('id', ParseIntPipe) id: number) {
    const education = await this.educationService.deleteEducation(id, {
      status: false,
    });
    return education;
  }

  @ApiOperation({ summary: 'Создание работы' })
  @ApiResponse({ status: 201, type: Work })
  @Post(':samaccountname/works/')
  async createWork(@Body() dto: CreateWorkDto) {
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
  async updateWorks(
    @Body() dto: UpdateWorkDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const work = this.worksService.updateWork(id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление работы' })
  @ApiResponse({ status: 200, type: Work })
  @Delete(':samaccountname/works/:id')
  async deleteWork(@Param('id', ParseIntPipe) id: number) {
    const work = await this.worksService.deleteWork(id, {
      status: false,
    });
    return work;
  }

  @ApiOperation({ summary: 'Создание достижения' })
  @ApiResponse({ status: 201, type: Achievement })
  @Post(':samaccountname/achievements/')
  async createAchievement(@Body() dto: CreateAchievementDto) {
    const work = this.achievementService.createAchievement(dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение видимости блока достижения' })
  @ApiResponse({ status: 200, type: [Achievement] })
  @Patch(':samaccountname/achievements/')
  async updateVisibleAchievements(@Body() dto: UpdateVisibleAchievementsDto) {
    const work = this.achievementService.updateVisible(dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение достижения' })
  @ApiResponse({ status: 200, type: Achievement })
  @Patch(':samaccountname/achievements/:id')
  async updateAchievement(
    @Body() dto: UpdateAchievementDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const work = this.achievementService.updateAchievement(id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление достижения' })
  @ApiResponse({ status: 200, type: Achievement })
  @Delete(':samaccountname/achievements/:id')
  async deleteAchievement(@Param('id', ParseIntPipe) id: number) {
    const work = await this.achievementService.deleteAchievement(id, {
      status: false,
    });
    return work;
  }

  @ApiOperation({ summary: 'Создание транспорта' })
  @ApiResponse({ status: 201, type: Transport })
  @Post(':samaccountname/transports/')
  async createTransport(@Body() dto: CreateTransportDto) {
    const work = this.transportService.createTransport(dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение видимости блока транспорта' })
  @ApiResponse({ status: 200, type: [Transport] })
  @Patch(':samaccountname/transports/')
  async updateVisibleTransports(@Body() dto: UpdateVisibleTransportsDto) {
    const work = this.transportService.updateVisible(dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение транспорта' })
  @ApiResponse({ status: 200, type: Transport })
  @Patch(':samaccountname/transports/:id')
  async updateTransport(
    @Body() dto: UpdateTransportDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const work = this.transportService.updateTransport(id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление транспорта' })
  @ApiResponse({ status: 200, type: Transport })
  @Delete(':samaccountname/transports/:id')
  async deleteTransport(@Param('id', ParseIntPipe) id: number) {
    const work = await this.transportService.deleteTransport(id, {
      status: false,
    });
    return work;
  }
}
