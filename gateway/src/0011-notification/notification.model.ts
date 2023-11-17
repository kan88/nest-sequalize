import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Message } from './0011-messages/message.model';
import { Participant0011 } from './0011-participants/participant.model';

import { CreateNotificationDto } from './dto/create-notification.dto';

@Table({ tableName: '0011-notifications' })
export class Notification extends Model<Notification, CreateNotificationDto> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'n7700-01-144',
    description: 'AD account number',
  })
  @Column({
    type: DataType.STRING(),
  })
  notification_author: string;

  @ApiProperty({
    example: 'fullname author',
    description: 'fullname',
  })
  @Column({
    type: DataType.STRING(),
  })
  notification_fullname: string;

  @ApiProperty({
    example: 'About corporate',
    description: 'theme',
  })
  @Column({
    type: DataType.STRING(),
  })
  notification_theme: string;

  @ApiProperty({
    example: true,
    description: 'status',
  })
  @Column({
    type: DataType.BOOLEAN,

    defaultValue: true,
  })
  status: boolean;

  @ApiProperty({ example: '2023-08-21 05:16:04', description: 'last message' })
  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('NOW'),
  })
  last_message: Date;

  @HasMany(() => Participant0011)
  participants: Participant0011[];

  @HasMany(() => Message)
  messages: Message[];

  quantity: number;
}
