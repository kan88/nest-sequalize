import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notification.model';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ParticipantService0011 } from './0011-participants/participant.service';
import { Message } from './0011-messages/message.model';
import { Participant0011 } from './0011-participants/participant.model';
import { MessageService } from './0011-messages/message.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationsRepository: typeof Notification,
    private participantsService: ParticipantService0011,
    private messagesService: MessageService,
  ) {}
  async create(dto: CreateNotificationDto) {
    const data = await this.notificationsRepository.create(dto);
    return data;
  }

  async getByAccount(samaccountname: string) {
    const whereIAmParticipant = await this.participantsService.findActualChats(
      samaccountname,
    );
    const data = await this.notificationsRepository.findAll({
      where: {
        id: whereIAmParticipant[0].chats_id,
        status: true,
      },
      order: [['last_message', 'DESC']],
      include: [
        { model: Message, as: 'messages', separate: true, limit: 10 },
        {
          model: Participant0011,
          as: 'participants',
          where: { status: true },
        },
      ],
    });

    return data;
  }
  async remove(id: number) {
    const data = await this.notificationsRepository.update(
      { status: false },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return data;
  }
}
