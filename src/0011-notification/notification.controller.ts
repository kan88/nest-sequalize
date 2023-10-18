import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Participant } from 'src/0005-participants/participant.model';
import { CreateMessageDto } from 'src/0011-messages/dto/create-message.dto';
import { CreateUploadDto } from 'src/0011-messages/dto/create-upload.dto';
import { Message } from 'src/0011-messages/message.model';
import { MessageService } from 'src/0011-messages/message.service';
import { CreateParticipantDto } from 'src/0011-participants/dto/create-participant.dto';
import { ParticipantService0011 } from 'src/0011-participants/participant.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@ApiTags('Сообщения')
@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private participantService: ParticipantService0011,
    private messageService: MessageService,
  ) {}
  @ApiOperation({ summary: 'Создание чата' })
  @ApiResponse({ status: 201, type: Notification })
  @Post('/')
  async create(@Body() dto: CreateNotificationDto) {
    const data = await this.notificationService.create(dto);
    await this.participantService.create({
      chats_id: data.dataValues.id,
      account_number: data.dataValues.notification_author,
      full_name: data.dataValues.notification_fullname,
    });
    return data;
  }

  @ApiOperation({ summary: 'Получение чатов' })
  @ApiResponse({ status: 200, type: Notification })
  @Get('/samaccountname/:samaccountname')
  async getByAccount(@Param('samaccountname') samaccountname: string) {
    const data = await this.notificationService.getByAccount(samaccountname);
    return data;
  }

  @ApiOperation({ summary: 'Удаление чата' })
  @ApiResponse({ status: 200, type: Notification })
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.notificationService.remove(id);
    return data;
  }
  @ApiOperation({ summary: 'Добавление участника' })
  @ApiResponse({ status: 201, type: Participant })
  @Post('/:chats_id/participant')
  async createParticipant(
    @Body() dto: CreateParticipantDto,
    @Param('chats_id', ParseIntPipe) chats_id: number,
  ) {
    const data = await this.participantService.create({
      ...dto,
      chats_id,
    });
    return data;
  }
  @ApiOperation({ summary: 'Удаление участника' })
  @ApiResponse({ status: 200, type: Participant })
  @Delete('/:chats_id/participant/:id')
  async removeParticipant(@Param('id', ParseIntPipe) id: number) {
    const data = await this.participantService.remove(id);
    return data;
  }

  @ApiOperation({ summary: 'Добавление сообщения' })
  @ApiResponse({ status: 201, type: Message })
  @Post('/:chats_id/message')
  async createMessage(
    @Body() dto: CreateMessageDto,
    @Param('chats_id', ParseIntPipe) chats_id: number,
  ) {
    const data = await this.messageService.create({
      ...dto,
      chats_id,
    });
    await this.participantService.increment(chats_id, dto.account_number);
    return data;
  }
  @ApiOperation({ summary: 'Удаление сообщения' })
  @ApiResponse({ status: 200, type: Message })
  @Delete('/:chats_id/message/:id')
  async removeMessage(
    @Param('chats_id', ParseIntPipe) chats_id: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const data = await this.messageService.remove(id);
    return data;
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        account_number: { type: 'string' },
        full_name: { type: 'string' },
        link: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Добавление файла' })
  @ApiResponse({ status: 201, type: Message })
  @UseInterceptors(FileInterceptor('link'))
  @Post('/:chats_id/upload')
  async uploadFile(
    @Body() dto: CreateUploadDto,
    @Param('chats_id', ParseIntPipe) chats_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.messageService.upload(dto, file, chats_id);
    return data;
  }

  @ApiOperation({ summary: 'Получение сообщений' })
  @ApiResponse({ status: 200, type: [Message] })
  @Get('/:chats_id/message/participant/:participant')
  async getByChatsId(
    @Param('chats_id', ParseIntPipe) chats_id: number,
    @Param('participant') participant: string,
  ) {
    const data = await this.messageService.getByChatsId(chats_id);
    await this.participantService.updateLastVisitUnreaded(
      chats_id,
      participant,
    );
    return data;
  }
}
