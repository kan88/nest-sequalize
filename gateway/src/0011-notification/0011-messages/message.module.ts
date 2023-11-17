import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/9999-files/files.module';
import { Message } from './message.model';

import { MessageService } from './message.service';

@Module({
  controllers: [],
  providers: [MessageService],
  imports: [SequelizeModule.forFeature([Message]), FilesModule],
  exports: [MessageService],
})
export class MessageModule {}
