import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { AvatarsService } from 'src/0084-avatars/avatars.service';
import { Avatar } from 'src/0084-avatars/avatars.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarUploadDto } from '../0084-avatars/dto/avatar-upload.dto';

@ApiTags('Профили пользователей')
@Controller('profiles')
export class ProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private projectsService: ProjectsService,
    private documentsService: DocumentsService,
    private educationService: EducationService,
    private worksService: WorksService,
    private achievementService: AchievementsService,
    private transportService: TransportsService,
    private avatarService: AvatarsService,
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
  @Patch(':id')
  async updateProfileById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    const profile = await this.profilesService.updateProfileById(dto, id);
    return profile;
  }

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 201, type: Project })
  @Post(':profile_id/projects')
  async createProject(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateProjectDto,
  ) {
    const project = this.projectsService.createProject({ ...dto, profile_id });
    return project;
  }

  @ApiOperation({ summary: 'Удаление проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Delete(':profile_id/projects/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectsService.deleteProject(id, {
      status: false,
    });
    return project;
  }

  @ApiOperation({ summary: 'Создание документа' })
  @ApiResponse({ status: 201, type: Document })
  @Post(':profile_id/documents/')
  async createDocument(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateDocumentDto,
  ) {
    const document = this.documentsService.createDocument({
      ...dto,
      profile_id,
    });
    return document;
  }

  @ApiOperation({ summary: 'Изменение видимости блока документов' })
  @ApiResponse({ status: 200, type: [Document] })
  @Patch(':profile_id/documents/')
  async updateVisibleDocuments(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleDocumentsDto,
  ) {
    const document = this.documentsService.updateVisible(profile_id, dto);
    return document;
  }

  @ApiOperation({ summary: 'Изменение документа' })
  @ApiResponse({ status: 200, type: Document })
  @Patch(':profile_id/documents/:id')
  async updateDocument(
    @Body() dto: UpdateDocumentDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const document = this.documentsService.updateDocument(id, dto);
    return document;
  }

  @ApiOperation({ summary: 'Удаление документа' })
  @ApiResponse({ status: 200, type: Document })
  @Delete(':profile_id/documents/:id')
  async deleteDocument(@Param('id', ParseIntPipe) id: number) {
    const document = await this.documentsService.deleteDocument(id, {
      status: false,
    });
    return document;
  }

  @ApiOperation({ summary: 'Создание образования' })
  @ApiResponse({ status: 201, type: Education })
  @Post(':profile_id/educations/')
  async createEducation(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateEducationDto,
  ) {
    const education = this.educationService.createEducation({
      ...dto,
      profile_id,
    });
    return education;
  }

  @ApiOperation({ summary: 'Изменение видимости блока образования' })
  @ApiResponse({ status: 200, type: [Education] })
  @Patch(':profile_id/educations')
  async updateVisibleEducations(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleEducationsDto,
  ) {
    const education = this.educationService.updateVisible(profile_id, dto);
    return education;
  }

  @ApiOperation({ summary: 'Изменение образования' })
  @ApiResponse({ status: 200, type: Education })
  @Patch(':profile_id/educations/:id')
  async updateEducation(
    @Body() dto: UpdateEducationDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const education = this.educationService.updateEducation(id, dto);
    return education;
  }

  @ApiOperation({ summary: 'Удаление образования' })
  @ApiResponse({ status: 200, type: Education })
  @Delete(':profile_id/educations/:id')
  async deleteEducation(@Param('id', ParseIntPipe) id: number) {
    const education = await this.educationService.deleteEducation(id, {
      status: false,
    });
    return education;
  }

  @ApiOperation({ summary: 'Создание работы' })
  @ApiResponse({ status: 201, type: Work })
  @Post(':profile_id/works/')
  async createWork(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateWorkDto,
  ) {
    const work = this.worksService.createWork({ ...dto, profile_id });
    return work;
  }

  @ApiOperation({ summary: 'Изменение видимости блока работы' })
  @ApiResponse({ status: 200, type: [Work] })
  @Patch(':profile_id/works/')
  async updateVisibleWorks(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleWorksDto,
  ) {
    const work = this.worksService.updateVisible(profile_id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение работы' })
  @ApiResponse({ status: 200, type: Work })
  @Patch(':profile_id/works/:id')
  async updateWorks(
    @Body() dto: UpdateWorkDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const work = this.worksService.updateWork(id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление работы' })
  @ApiResponse({ status: 200, type: Work })
  @Delete(':profile_id/works/:id')
  async deleteWork(@Param('id', ParseIntPipe) id: number) {
    const work = await this.worksService.deleteWork(id, {
      status: false,
    });
    return work;
  }

  @ApiOperation({ summary: 'Создание достижения' })
  @ApiResponse({ status: 201, type: Achievement })
  @Post(':profile_id/achievements/')
  async createAchievement(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateAchievementDto,
  ) {
    const work = this.achievementService.createAchievement({
      ...dto,
      profile_id,
    });
    return work;
  }

  @ApiOperation({ summary: 'Изменение видимости блока достижения' })
  @ApiResponse({ status: 200, type: [Achievement] })
  @Patch(':profile_id/achievements/')
  async updateVisibleAchievements(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleAchievementsDto,
  ) {
    const work = this.achievementService.updateVisible(profile_id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение достижения' })
  @ApiResponse({ status: 200, type: Achievement })
  @Patch(':profile_id/achievements/:id')
  async updateAchievement(
    @Body() dto: UpdateAchievementDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const work = this.achievementService.updateAchievement(id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление достижения' })
  @ApiResponse({ status: 200, type: Achievement })
  @Delete(':profile_id/achievements/:id')
  async deleteAchievement(@Param('id', ParseIntPipe) id: number) {
    const work = await this.achievementService.deleteAchievement(id, {
      status: false,
    });
    return work;
  }

  @ApiOperation({ summary: 'Создание транспорта' })
  @ApiResponse({ status: 201, type: Transport })
  @Post(':profile_id/transports')
  async createTransport(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateTransportDto,
  ) {
    const work = this.transportService.createTransport({ ...dto, profile_id });
    return work;
  }

  @ApiOperation({ summary: 'Изменение видимости блока транспорта' })
  @ApiResponse({ status: 200, type: [Transport] })
  @Patch(':profile_id/transports')
  async updateVisibleTransports(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleTransportsDto,
  ) {
    const work = this.transportService.updateVisible(profile_id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Изменение транспорта' })
  @ApiResponse({ status: 200, type: Transport })
  @Patch(':profile_id/transports/:id')
  async updateTransport(
    @Body() dto: UpdateTransportDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const work = this.transportService.updateTransport(id, dto);
    return work;
  }

  @ApiOperation({ summary: 'Удаление транспорта' })
  @ApiResponse({ status: 200, type: Transport })
  @Delete(':profile_id/transports/:id')
  async deleteTransport(@Param('id', ParseIntPipe) id: number) {
    const work = await this.transportService.deleteTransport(id, {
      status: false,
    });
    return work;
  }

  @ApiResponse({ status: 201, type: Avatar })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'form-data',
    type: AvatarUploadDto,
  })
  @ApiOperation({ summary: 'Создание аватара' })
  @UseInterceptors(FileInterceptor('avatar_src'))
  @Post(':profile_id/avatars/')
  async createAvatar(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: AvatarUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const avatar = await this.avatarService.createAvatar(profile_id, file);
    return avatar;
  }

  @ApiResponse({ status: 200, type: Avatar })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'form-data',
    type: AvatarUploadDto,
  })
  @ApiOperation({ summary: 'Изменение аватара' })
  @UseInterceptors(FileInterceptor('avatar_src'))
  @Patch(':profile_id/avatars/:id')
  async updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatar = await this.avatarService.updateAvatar(id, file);
    return avatar;
  }

  @ApiResponse({ status: 200, type: Avatar })
  @ApiOperation({ summary: 'Изменение аватара' })
  @Delete(':profile_id/avatars/:id')
  async deleteAvatar(@Param('id', ParseIntPipe) id: number) {
    const avatar = await this.avatarService.deleteAvatar(id, { status: false });
    return avatar;
  }
}
