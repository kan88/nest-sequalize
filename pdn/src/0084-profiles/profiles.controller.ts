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
  Inject,
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

import { UpdateProfileDto } from './dto/update-profile.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectsService } from './0084-projects/projects.service';
import { DocumentsService } from './0084-documents/documents.service';
import { EducationService } from './0084-education/education.service';
import { WorksService } from './0084-works/works.service';
import { AchievementsService } from './0084-achievements/achievements.service';
import { TransportsService } from './0084-transports/transports.service';
import { AvatarsService } from './0084-avatars/avatars.service';
import { Project } from './0084-projects/projects.model';
import { CreateProjectDto } from './0084-projects/dto/create-project.dto';
import { UpdateProjectDto } from './0084-projects/dto/update-project.dto';
import { CreateDocumentDto } from './0084-documents/dto/create-document.dto';
import { UpdateVisibleDocumentsDto } from './0084-documents/dto/update-visible-documents.dto';
import { UpdateDocumentDto } from './0084-documents/dto/update-document.dto';
import { Education } from './0084-education/education.model';
import { CreateEducationDto } from './0084-education/dto/create-education.dto';
import { UpdateVisibleEducationsDto } from './0084-education/dto/update-visible-educations.dto';
import { UpdateEducationDto } from './0084-education/dto/update-education.dto';
import { CreateWorkDto } from './0084-works/dto/create-work.dto';
import { UpdateVisibleWorksDto } from './0084-works/dto/update-visible-works.dto';
import { UpdateWorkDto } from './0084-works/dto/update-work.dto';
import { Achievement } from './0084-achievements/achievements.model';
import { CreateAchievementDto } from './0084-achievements/dto/create-achievement.dto';
import { UpdateVisibleAchievementsDto } from './0084-achievements/dto/update-visible-achievements.dto';
import { UpdateAchievementDto } from './0084-achievements/dto/update-achievement.dto';
import { Transport as Transports } from './0084-transports/transports.model';
import { CreateTransportDto } from './0084-transports/dto/create-transport.dto';
import { UpdateVisibleTransportsDto } from './0084-transports/dto/update-visible-transports.dto';
import { UpdateTransportDto } from './0084-transports/dto/update-transport.dto';
import { Avatar } from './0084-avatars/avatars.model';
import { AvatarUploadDto } from './0084-avatars/dto/avatar-upload.dto';
import { Work } from './0084-works/works.model';
import { Document } from './0084-documents/documents.model';
import { MessagePattern, Payload, ClientKafka } from '@nestjs/microservices';
import { CreateProjectDatabaseDto } from './0084-projects/dto/create-project-database.dto';

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

  // @ApiOperation({ summary: 'Получение или создание пользователя' })
  // @ApiResponse({ status: 200, type: Profile })
  // @Get(':samaccountname')
  // async getProfileOrCreateBySamaccountname(
  //   @Param('samaccountname') samaccountname: string,
  // ) {
  //   const profile =
  //     await this.profilesService.getProfileOrCreateBySamaccountname(
  //       samaccountname,
  //     );
  //   return profile;
  // }
  @MessagePattern('profile.get.or.create')
  async getProfileOrCreateBySamaccountname(@Payload() samaccountname: string) {
    return await this.profilesService.getProfileOrCreateBySamaccountname(
      samaccountname,
    );
  }

  // @ApiOperation({ summary: 'Обновление пользователя' })
  // @ApiResponse({ status: 200, type: Profile })
  // @Patch(':id')
  @MessagePattern('profile.update.by.id')
  async updateProfileById(
    @Payload() data: { dto: UpdateProfileDto; id: number },
  ) {
    console.log(data);
    return await this.profilesService.updateProfileById(data.dto, data.id);
  }

  // @ApiOperation({ summary: 'Создание проекта' })
  // @ApiResponse({ status: 201, type: Project })
  // @Post(':profile_id/projects')
  @MessagePattern('profile.create.project')
  async createProject(@Payload() data: CreateProjectDatabaseDto) {
    const res = await this.projectsService.createProject(data);
    console.log('res', res);
    return res.dataValues;
  }

  // @ApiOperation({ summary: 'Удаление проекта' })
  // @ApiResponse({ status: 200, type: Project })
  // @Delete(':profile_id/projects/:id')
  @MessagePattern('profile.delete.project')
  async deleteProject(@Payload() id: number) {
    console.log(id);
    const project = await this.projectsService.deleteProject(id, {
      status: false,
    });
    return project;
  }

  // @ApiOperation({ summary: 'Изменение проекта' })
  // @ApiResponse({ status: 200, type: Project })
  // @Patch(':profile_id/projects/:id')
  @MessagePattern('profile.patch.project')
  async updateProject(@Payload() data: { id: number; dto: UpdateProjectDto }) {
    const project = await this.projectsService.updateProject(data.id, data.dto);
    return project;
  }

  // @ApiOperation({ summary: 'Получение проекта' })
  // @ApiResponse({ status: 200, type: Project })
  // @Get(':profile_id/projects/:id')
  @MessagePattern('profile.get.project')
  async getProjectById(@Payload() id: number) {
    const project = await this.projectsService.getProjectById(id);
    return project.dataValues;
  }

  // @ApiOperation({ summary: 'Создание документа' })
  // @ApiResponse({ status: 201, type: Document })
  // @Post(':profile_id/documents/')
  @MessagePattern('profile.create.document')
  async createDocument(
    @Payload() data: CreateDocumentDto & { profile_id: number },
  ) {
    const document = await this.documentsService.createDocument({
      ...data,
    });
    return document.dataValues;
  }

  // @ApiOperation({ summary: 'Изменение видимости блока документов' })
  // @ApiResponse({ status: 200, type: [Document] })
  // @Patch(':profile_id/documents/')
  @MessagePattern('profile.visible.documents')
  async updateVisibleDocuments(
    @Payload() data: { profile_id: number; dto: UpdateVisibleDocumentsDto },
  ) {
    const document = await this.documentsService.updateVisible(
      data.profile_id,
      data.dto,
    );
    return document;
  }

  // @ApiOperation({ summary: 'Изменение документа' })
  // @ApiResponse({ status: 200, type: Document })
  // @Patch(':profile_id/documents/:id')
  @MessagePattern('profile.patch.document')
  async updateDocument(
    @Payload() data: { dto: UpdateDocumentDto; id: number },
  ) {
    const document = await this.documentsService.updateDocument(
      data.id,
      data.dto,
    );
    return document;
  }

  // @ApiOperation({ summary: 'Удаление документа' })
  // @ApiResponse({ status: 200, type: Document })
  // @Delete(':profile_id/documents/:id')
  @MessagePattern('profile.delete.document')
  async deleteDocument(@Payload() id: number) {
    const document = await this.documentsService.deleteDocument(id, {
      status: false,
    });
    return document;
  }

  // @ApiOperation({ summary: 'Создание образования' })
  // @ApiResponse({ status: 201, type: Education })
  // @Post(':profile_id/educations/')
  @MessagePattern('profile.create.education')
  async createEducation(
    @Payload() data: CreateEducationDto & { profile_id: number },
  ) {
    const education = await this.educationService.createEducation(data);
    return education.dataValues;
  }

  // @ApiOperation({ summary: 'Изменение видимости блока образования' })
  // @ApiResponse({ status: 200, type: [Education] })
  // @Patch(':profile_id/educations')
  @MessagePattern('profile.visible.educations')
  async updateVisibleEducations(
    @Payload() data: { dto: UpdateVisibleEducationsDto; profile_id: number },
  ) {
    const education = await this.educationService.updateVisible(
      data.profile_id,
      data.dto,
    );
    return education;
  }

  // @ApiOperation({ summary: 'Изменение образования' })
  // @ApiResponse({ status: 200, type: Education })
  // @Patch(':profile_id/educations/:id')
  @MessagePattern('profile.patch.education')
  async updateEducation(
    @Payload() data: { dto: UpdateEducationDto; id: number },
  ) {
    const education = await this.educationService.updateEducation(
      data.id,
      data.dto,
    );
    return education;
  }

  // @ApiOperation({ summary: 'Удаление образования' })
  // @ApiResponse({ status: 200, type: Education })
  // @Delete(':profile_id/educations/:id')
  @MessagePattern('profile.delete.education')
  async deleteEducation(@Payload() id: number) {
    const education = await this.educationService.deleteEducation(id, {
      status: false,
    });
    return education;
  }

  // @ApiOperation({ summary: 'Создание работы' })
  // @ApiResponse({ status: 201, type: Work })
  // @Post(':profile_id/works/')
  @MessagePattern('profile.create.work')
  async createWork(@Payload() data: CreateWorkDto & { profile_id: number }) {
    const work = await this.worksService.createWork(data);

    return work.dataValues;
  }

  // @ApiOperation({ summary: 'Изменение видимости блока работы' })
  // @ApiResponse({ status: 200, type: [Work] })
  // @Patch(':profile_id/works/')
  @MessagePattern('profile.visible.works')
  async updateVisibleWorks(
    @Payload() data: { profile_id: number; dto: UpdateVisibleWorksDto },
  ) {
    const work = await this.worksService.updateVisible(
      data.profile_id,
      data.dto,
    );
    return work;
  }

  // @ApiOperation({ summary: 'Изменение работы' })
  // @ApiResponse({ status: 200, type: Work })
  // @Patch(':profile_id/works/:id')
  @MessagePattern('profile.patch.work')
  async updateWorks(@Payload() data: { dto: UpdateWorkDto; id: number }) {
    const work = this.worksService.updateWork(data.id, data.dto);
    return work;
  }

  // @ApiOperation({ summary: 'Удаление работы' })
  // @ApiResponse({ status: 200, type: Work })
  // @Delete(':profile_id/works/:id')
  @MessagePattern('profile.delete.work')
  async deleteWork(@Payload() id: number) {
    const work = await this.worksService.deleteWork(id, {
      status: false,
    });
    return work;
  }

  // @ApiOperation({ summary: 'Создание достижения' })
  // @ApiResponse({ status: 201, type: Achievement })
  // @Post(':profile_id/achievements/')
  @MessagePattern('profile.create.achievement')
  async createAchievement(
    @Payload() data: CreateAchievementDto & { profile_id: number },
  ) {
    const work = await this.achievementService.createAchievement(data);

    return work.dataValues;
  }

  // @ApiOperation({ summary: 'Изменение видимости блока достижения' })
  // @ApiResponse({ status: 200, type: [Achievement] })
  // @Patch(':profile_id/achievements/')
  @MessagePattern('profile.visible.achievements')
  async updateVisibleAchievements(
    @Payload() data: { dto: UpdateVisibleAchievementsDto; profile_id: number },
  ) {
    const work = await this.achievementService.updateVisible(
      data.profile_id,
      data.dto,
    );
    return work;
  }

  // @ApiOperation({ summary: 'Изменение достижения' })
  // @ApiResponse({ status: 200, type: Achievement })
  // @Patch(':profile_id/achievements/:id')
  @MessagePattern('profile.patch.achievement')
  async updateAchievement(
    @Payload() data: { dto: UpdateAchievementDto; id: number },
  ) {
    const work = await this.achievementService.updateAchievement(
      data.id,
      data.dto,
    );
    return work;
  }

  // @ApiOperation({ summary: 'Удаление достижения' })
  // @ApiResponse({ status: 200, type: Achievement })
  // @Delete(':profile_id/achievements/:id')
  @MessagePattern('profile.delete.achievement')
  async deleteAchievement(@Payload() id: number) {
    const work = await this.achievementService.deleteAchievement(id, {
      status: false,
    });
    return work;
  }

  // @ApiOperation({ summary: 'Создание транспорта' })
  // @ApiResponse({ status: 201, type: Transports })
  // @Post(':profile_id/transports')
  @MessagePattern('profile.create.transport')
  async createTransport(
    @Payload() data: CreateTransportDto & { profile_id: number },
  ) {
    const work = await this.transportService.createTransport(data);
    return work.dataValues;
  }

  // @ApiOperation({ summary: 'Изменение видимости блока транспорта' })
  // @ApiResponse({ status: 200, type: [Transports] })
  // @Patch(':profile_id/transports')
  @MessagePattern('profile.visible.transports')
  async updateVisibleTransports(
    @Payload() data: { dto: UpdateVisibleTransportsDto; profile_id: number },
  ) {
    const work = await this.transportService.updateVisible(
      data.profile_id,
      data.dto,
    );
    return work;
  }

  // @ApiOperation({ summary: 'Изменение транспорта' })
  // @ApiResponse({ status: 200, type: Transports })
  // @Patch(':profile_id/transports/:id')
  @MessagePattern('profile.patch.transport')
  async updateTransport(
    @Payload() data: { dto: UpdateTransportDto; id: number },
  ) {
    const work = await this.transportService.updateTransport(data.id, data.dto);
    return work;
  }

  // @ApiOperation({ summary: 'Удаление транспорта' })
  // @ApiResponse({ status: 200, type: Transports })
  // @Delete(':profile_id/transports/:id')
  @MessagePattern('profile.delete.transport')
  async deleteTransport(@Payload() id: number) {
    const work = await this.transportService.deleteTransport(id, {
      status: false,
    });
    return work;
  }

  // @ApiResponse({ status: 201, type: Avatar })
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'form-data',
  //   type: AvatarUploadDto,
  // })
  // @ApiOperation({ summary: 'Создание аватара' })
  // @UseInterceptors(FileInterceptor('avatar_src'))
  // @Post(':profile_id/avatars/')
  @MessagePattern('profile.create.avatar')
  async createAvatar(
    @Payload() data: { profile_id: number; avatar_src: string },
  ) {
    console.log('data', data);
    const avatar = await this.avatarService.createAvatar(
      data.profile_id,
      data.avatar_src,
    );
    return avatar.dataValues;
  }

  // @ApiResponse({ status: 200, type: Avatar })
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'form-data',
  //   type: AvatarUploadDto,
  // })
  // @ApiOperation({ summary: 'Изменение аватара' })
  // @UseInterceptors(FileInterceptor('avatar_src'))
  // @Patch(':profile_id/avatars/:id')
  @MessagePattern('profile.patch.avatar')
  async updateAvatar(@Payload() data: { id: number; avatar_src: string }) {
    const avatar = await this.avatarService.updateAvatar(
      data.id,
      data.avatar_src,
    );
    return avatar;
  }

  // @ApiResponse({ status: 200, type: Avatar })
  // @ApiOperation({ summary: 'Удаление аватара' })
  // @Delete(':profile_id/avatars/:id')
  @MessagePattern('profile.delete.avatar')
  async deleteAvatar(@Payload() id: number) {
    const avatar = await this.avatarService.deleteAvatar(id, { status: false });
    return avatar;
  }
}
