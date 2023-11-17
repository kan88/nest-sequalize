import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './0011-messages/message.model';
import { MessageModule } from './0011-messages/message.module';
import { Participant0011 } from './0011-participants/participant.model';
import { ParticipantModule0011 } from './0011-participants/participant.module';

import { NotificationController } from './notification.controller';
import { Notification } from './notification.model';

import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    SequelizeModule.forFeature([Notification, Participant0011, Message]),
    ParticipantModule0011,
    MessageModule,
  ],
  exports: [],
})
export class NotificationsModule {}
