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
import {
  Client,
  ClientKafka,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { FilesService } from 'src/9999-files/files.service';
import { E_SERVICES_CODE } from 'src/types/ENUMS';

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
    private filesService: FilesService,
  ) {}
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-gateway',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'profile-consumer',
      },
    },
  })
  client: ClientKafka;
  async onModuleInit() {
    this.client.subscribeToResponseOf('profile.get.or.create');
    this.client.subscribeToResponseOf('profile.update.by.id');
    this.client.subscribeToResponseOf('profile.create.project');
    this.client.subscribeToResponseOf('profile.delete.project');
    this.client.subscribeToResponseOf('profile.patch.project');
    this.client.subscribeToResponseOf('profile.get.project');
    this.client.subscribeToResponseOf('profile.create.document');
    this.client.subscribeToResponseOf('profile.visible.documents');
    this.client.subscribeToResponseOf('profile.patch.document');
    this.client.subscribeToResponseOf('profile.delete.document');
    this.client.subscribeToResponseOf('profile.create.education');
    this.client.subscribeToResponseOf('profile.visible.educations');
    this.client.subscribeToResponseOf('profile.patch.education');
    this.client.subscribeToResponseOf('profile.delete.education');
    this.client.subscribeToResponseOf('profile.create.work');
    this.client.subscribeToResponseOf('profile.visible.works');
    this.client.subscribeToResponseOf('profile.patch.work');
    this.client.subscribeToResponseOf('profile.delete.work');
    this.client.subscribeToResponseOf('profile.create.achievement');
    this.client.subscribeToResponseOf('profile.visible.achievements');
    this.client.subscribeToResponseOf('profile.patch.achievement');
    this.client.subscribeToResponseOf('profile.delete.achievement');
    this.client.subscribeToResponseOf('profile.create.transport');
    this.client.subscribeToResponseOf('profile.visible.transports');
    this.client.subscribeToResponseOf('profile.patch.transport');
    this.client.subscribeToResponseOf('profile.delete.transport');
    this.client.subscribeToResponseOf('profile.create.avatar');
    this.client.subscribeToResponseOf('profile.patch.avatar');
    this.client.subscribeToResponseOf('profile.delete.avatar');

    await this.client.connect();
  }

  @ApiOperation({ summary: 'Получение или создание пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Get(':samaccountname')
  async getProfileOrCreateBySamaccountname(
    @Param('samaccountname') samaccountname: string,
  ) {
    return this.client.send('profile.get.or.create', samaccountname);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: Profile })
  @Patch(':id')
  async updateProfileById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.client.send('profile.update.by.id', { dto, id });
  }

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiResponse({ status: 201, type: Project })
  @Post(':profile_id/projects')
  async createProject(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateProjectDto,
  ) {
    return this.client.send('profile.create.project', {
      ...dto,
      profile_id,
    });
  }

  @ApiOperation({ summary: 'Удаление проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Delete(':profile_id/projects/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.project', id);
  }

  @ApiOperation({ summary: 'Изменение проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Patch(':profile_id/projects/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.client.send('profile.patch.project', {
      id,
      dto,
    });
  }

  @ApiOperation({ summary: 'Получение проекта' })
  @ApiResponse({ status: 200, type: Project })
  @Get(':profile_id/projects/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.get.project', id);
  }

  @ApiOperation({ summary: 'Создание документа' })
  @ApiResponse({ status: 201, type: Document })
  @Post(':profile_id/documents/')
  async createDocument(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateDocumentDto,
  ) {
    return this.client.send('profile.create.document', {
      ...dto,
      profile_id,
    });
  }

  @ApiOperation({ summary: 'Изменение видимости блока документов' })
  @ApiResponse({ status: 200, type: [Document] })
  @Patch(':profile_id/documents/')
  async updateVisibleDocuments(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleDocumentsDto,
  ) {
    return this.client.send('profile.visible.documents', {
      dto,
      profile_id,
    });
  }

  @ApiOperation({ summary: 'Изменение документа' })
  @ApiResponse({ status: 200, type: Document })
  @Patch(':profile_id/documents/:id')
  async updateDocument(
    @Body() dto: UpdateDocumentDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.client.send('profile.patch.document', {
      dto,
      id,
    });
  }

  @ApiOperation({ summary: 'Удаление документа' })
  @ApiResponse({ status: 200, type: Document })
  @Delete(':profile_id/documents/:id')
  async deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.document', id);
  }

  @ApiOperation({ summary: 'Создание образования' })
  @ApiResponse({ status: 201, type: Education })
  @Post(':profile_id/educations/')
  async createEducation(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateEducationDto,
  ) {
    return this.client.send('profile.create.education', { ...dto, profile_id });
  }

  @ApiOperation({ summary: 'Изменение видимости блока образования' })
  @ApiResponse({ status: 200, type: [Education] })
  @Patch(':profile_id/educations')
  async updateVisibleEducations(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleEducationsDto,
  ) {
    return this.client.send('profile.visible.educations', { profile_id, dto });
  }

  @ApiOperation({ summary: 'Изменение образования' })
  @ApiResponse({ status: 200, type: Education })
  @Patch(':profile_id/educations/:id')
  async updateEducation(
    @Body() dto: UpdateEducationDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.client.send('profile.patch.education', { id, dto });
  }

  @ApiOperation({ summary: 'Удаление образования' })
  @ApiResponse({ status: 200, type: Education })
  @Delete(':profile_id/educations/:id')
  async deleteEducation(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.education', id);
  }

  @ApiOperation({ summary: 'Создание работы' })
  @ApiResponse({ status: 201, type: Work })
  @Post(':profile_id/works/')
  async createWork(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateWorkDto,
  ) {
    return this.client.send('profile.create.work', { ...dto, profile_id });
  }

  @ApiOperation({ summary: 'Изменение видимости блока работы' })
  @ApiResponse({ status: 200, type: [Work] })
  @Patch(':profile_id/works/')
  async updateVisibleWorks(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleWorksDto,
  ) {
    return this.client.send('profile.visible.works', { dto, profile_id });
  }

  @ApiOperation({ summary: 'Изменение работы' })
  @ApiResponse({ status: 200, type: Work })
  @Patch(':profile_id/works/:id')
  async updateWorks(
    @Body() dto: UpdateWorkDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.client.send('profile.patch.work', { dto, id });
  }

  @ApiOperation({ summary: 'Удаление работы' })
  @ApiResponse({ status: 200, type: Work })
  @Delete(':profile_id/works/:id')
  async deleteWork(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.work', id);
  }

  @ApiOperation({ summary: 'Создание достижения' })
  @ApiResponse({ status: 201, type: Achievement })
  @Post(':profile_id/achievements/')
  async createAchievement(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateAchievementDto,
  ) {
    return this.client.send('profile.create.achievement', {
      ...dto,
      profile_id,
    });
  }

  @ApiOperation({ summary: 'Изменение видимости блока достижения' })
  @ApiResponse({ status: 200, type: [Achievement] })
  @Patch(':profile_id/achievements/')
  async updateVisibleAchievements(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleAchievementsDto,
  ) {
    return this.client.send('profile.visible.achievements', {
      dto,
      profile_id,
    });
  }

  @ApiOperation({ summary: 'Изменение достижения' })
  @ApiResponse({ status: 200, type: Achievement })
  @Patch(':profile_id/achievements/:id')
  async updateAchievement(
    @Body() dto: UpdateAchievementDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.client.send('profile.patch.achievement', {
      dto,
      id,
    });
  }

  @ApiOperation({ summary: 'Удаление достижения' })
  @ApiResponse({ status: 200, type: Achievement })
  @Delete(':profile_id/achievements/:id')
  async deleteAchievement(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.achievement', id);
  }

  @ApiOperation({ summary: 'Создание транспорта' })
  @ApiResponse({ status: 201, type: Transports })
  @Post(':profile_id/transports')
  async createTransport(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: CreateTransportDto,
  ) {
    return this.client.send('profile.create.transport', { ...dto, profile_id });
  }

  @ApiOperation({ summary: 'Изменение видимости блока транспорта' })
  @ApiResponse({ status: 200, type: [Transports] })
  @Patch(':profile_id/transports')
  async updateVisibleTransports(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: UpdateVisibleTransportsDto,
  ) {
    return this.client.send('profile.visible.transports', { profile_id, dto });
  }

  @ApiOperation({ summary: 'Изменение транспорта' })
  @ApiResponse({ status: 200, type: Transports })
  @Patch(':profile_id/transports/:id')
  async updateTransport(
    @Body() dto: UpdateTransportDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.client.send('profile.patch.transport', { id, dto });
  }

  @ApiOperation({ summary: 'Удаление транспорта' })
  @ApiResponse({ status: 200, type: Transports })
  @Delete(':profile_id/transports/:id')
  async deleteTransport(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.transport', id);
  }

  @ApiResponse({ status: 201, type: Avatar })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar_src: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // @ApiBody({
  //   description: 'form-data',
  //   type: AvatarUploadDto,
  // })
  @ApiOperation({ summary: 'Создание аватара' })
  @UseInterceptors(FileInterceptor('avatar_src'))
  @Post(':profile_id/avatars/')
  async createAvatar(
    @Param('profile_id', ParseIntPipe) profile_id: number,
    @Body() dto: AvatarUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatar_src = await this.filesService.createFile(
      E_SERVICES_CODE.profiles,
      file,
      'grpdn',
    );
    console.log(file);
    return this.client.send('profile.create.avatar', {
      profile_id,
      avatar_src,
    });
  }

  @ApiResponse({ status: 200, type: Avatar })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar_src: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Изменение аватара' })
  @UseInterceptors(FileInterceptor('avatar_src'))
  @Patch(':profile_id/avatars/:id')
  async updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatar_src = await this.filesService.createFile(
      E_SERVICES_CODE.profiles,
      file,
      'grpdn',
    );
    return this.client.send('profile.patch.avatar', {
      id,
      avatar_src,
    });
  }

  @ApiResponse({ status: 200, type: Avatar })
  @ApiOperation({ summary: 'Удаление аватара' })
  @Delete(':profile_id/avatars/:id')
  async deleteAvatar(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('profile.delete.avatar', id);
  }
}
